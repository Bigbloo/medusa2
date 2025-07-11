import {
  AdditionalData,
  AddToCartWorkflowInputDTO,
  ConfirmVariantInventoryWorkflowInputDTO,
} from "@medusajs/framework/types"
import {
  CartWorkflowEvents,
  deduplicate,
  isDefined,
} from "@medusajs/framework/utils"
import {
  createHook,
  createWorkflow,
  parallelize,
  transform,
  when,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "../../common"
import { emitEventStep } from "../../common/steps/emit-event"
import { useRemoteQueryStep } from "../../common/steps/use-remote-query"
import {
  createLineItemsStep,
  getLineItemActionsStep,
  updateLineItemsStep,
} from "../steps"
import { validateCartStep } from "../steps/validate-cart"
import { validateLineItemPricesStep } from "../steps/validate-line-item-prices"
import { validateVariantPricesStep } from "../steps/validate-variant-prices"
import {
  cartFieldsForPricingContext,
  productVariantsFields,
} from "../utils/fields"
import { requiredVariantFieldsForInventoryConfirmation } from "../utils/prepare-confirm-inventory-input"
import {
  prepareLineItemData,
  PrepareLineItemDataInput,
} from "../utils/prepare-line-item-data"
import { pricingContextResult } from "../utils/schemas"
import { confirmVariantInventoryWorkflow } from "./confirm-variant-inventory"
import { refreshCartItemsWorkflow } from "./refresh-cart-items"

const cartFields = ["completed_at"].concat(cartFieldsForPricingContext)

export const addToCartWorkflowId = "add-to-cart"
/**
 * This workflow adds a product variant to a cart as a line item. It's executed by the
 * [Add Line Item Store API Route](https://docs.medusajs.com/api/store#carts_postcartsidlineitems).
 *
 * You can use this workflow within your own customizations or custom workflows, allowing you to wrap custom logic around adding an item to the cart.
 * For example, you can use this workflow to add a line item to the cart with a custom price.
 *
 * @example
 * const { result } = await addToCartWorkflow(container)
 * .run({
 *   input: {
 *     cart_id: "cart_123",
 *     items: [
 *       {
 *         variant_id: "variant_123",
 *         quantity: 1,
 *       },
 *       {
 *         variant_id: "variant_456",
 *         quantity: 1,
 *         unit_price: 20
 *       }
 *     ]
 *   }
 * })
 *
 * @summary
 *
 * Add a line item to a cart.
 *
 * @property hooks.validate - This hook is executed before all operations. You can consume this hook to perform any custom validation. If validation fails, you can throw an error to stop the workflow execution.
 * @property hooks.setPricingContext - This hook is executed after the cart is retrieved and before the line items are created. You can consume this hook to return any custom context useful for the prices retrieval of the variants to be added to the cart.
 *
 * For example, assuming you have the following custom pricing rule:
 *
 * ```json
 * {
 *   "attribute": "location_id",
 *   "operator": "eq",
 *   "value": "sloc_123",
 * }
 * ```
 *
 * You can consume the `setPricingContext` hook to add the `location_id` context to the prices calculation:
 *
 * ```ts
 * import { addToCartWorkflow } from "@medusajs/medusa/core-flows";
 * import { StepResponse } from "@medusajs/workflows-sdk";
 *
 * addToCartWorkflow.hooks.setPricingContext((
 *   { cart, variantIds, items, additional_data }, { container }
 * ) => {
 *   return new StepResponse({
 *     location_id: "sloc_123", // Special price for in-store purchases
 *   });
 * });
 * ```
 *
 * The variants' prices will now be retrieved using the context you return.
 *
 * :::note
 *
 * Learn more about prices calculation context in the [Prices Calculation](https://docs.medusajs.com/resources/commerce-modules/pricing/price-calculation) documentation.
 *
 * :::
 */
export const addToCartWorkflow = createWorkflow(
  addToCartWorkflowId,
  (input: WorkflowData<AddToCartWorkflowInputDTO & AdditionalData>) => {
    const cartQuery = useQueryGraphStep({
      entity: "cart",
      filters: { id: input.cart_id },
      fields: cartFields,
      options: { throwIfKeyNotFound: true },
    }).config({ name: "get-cart" })

    const cart = transform({ cartQuery }, ({ cartQuery }) => {
      return cartQuery.data[0]
    })

    validateCartStep({ cart })
    const validate = createHook("validate", {
      input,
      cart,
    })

    const variantIds = transform({ input }, (data) => {
      return (data.input.items ?? []).map((i) => i.variant_id).filter(Boolean)
    })

    const setPricingContext = createHook(
      "setPricingContext",
      {
        cart,
        variantIds,
        items: input.items,
        additional_data: input.additional_data,
      },
      {
        resultValidator: pricingContextResult,
      }
    )

    const setPricingContextResult = setPricingContext.getResult()
    const pricingContext = transform(
      { cart, setPricingContextResult },
      (data) => {
        return {
          ...data.cart,
          ...(data.setPricingContextResult ? data.setPricingContextResult : {}),
          currency_code: data.cart.currency_code,
          region_id: data.cart.region_id,
          region: data.cart.region,
          customer_id: data.cart.customer_id,
          customer: data.cart.customer,
        }
      }
    )

    const variants = when({ variantIds }, ({ variantIds }) => {
      return !!variantIds.length
    }).then(() => {
      return useRemoteQueryStep({
        entry_point: "variants",
        fields: deduplicate([
          ...productVariantsFields,
          ...requiredVariantFieldsForInventoryConfirmation,
        ]),
        variables: {
          id: variantIds,
          calculated_price: {
            context: pricingContext,
          },
        },
      })
    })

    validateVariantPricesStep({ variants })

    const lineItems = transform({ input, variants }, (data) => {
      const items = (data.input.items ?? []).map((item) => {
        const variant = (data.variants ?? []).find(
          (v) => v.id === item.variant_id
        )!

        const input: PrepareLineItemDataInput = {
          item,
          variant: variant,
          cartId: data.input.cart_id,
          unitPrice: item.unit_price,
          isTaxInclusive:
            item.is_tax_inclusive ??
            variant?.calculated_price?.is_calculated_price_tax_inclusive,
          isCustomPrice: isDefined(item?.unit_price),
        }

        if (variant && !isDefined(input.unitPrice)) {
          input.unitPrice = variant.calculated_price?.calculated_amount
        }

        return prepareLineItemData(input)
      })

      return items
    })

    validateLineItemPricesStep({ items: lineItems })

    const { itemsToCreate = [], itemsToUpdate = [] } = getLineItemActionsStep({
      id: cart.id,
      items: lineItems,
    })

    const itemsToConfirmInventory = transform(
      { itemsToUpdate, itemsToCreate },
      (data) => {
        return (data.itemsToUpdate as [])
          .concat(data.itemsToCreate as [])
          .filter(
            (
              item:
                | {
                    data: { variant_id: string }
                  }
                | { variant_id?: string }
            ) =>
              isDefined(
                "data" in item ? item.data?.variant_id : item.variant_id
              )
          ) as unknown as ConfirmVariantInventoryWorkflowInputDTO["itemsToUpdate"]
      }
    )

    confirmVariantInventoryWorkflow.runAsStep({
      input: {
        sales_channel_id: cart.sales_channel_id,
        variants,
        items: input.items,
        itemsToUpdate: itemsToConfirmInventory,
      },
    })

    const [createdLineItems, updatedLineItems] = parallelize(
      createLineItemsStep({
        id: cart.id,
        items: itemsToCreate,
      }),
      updateLineItemsStep({
        id: cart.id,
        items: itemsToUpdate,
      })
    )

    const allItems = transform(
      { createdLineItems, updatedLineItems },
      ({ createdLineItems = [], updatedLineItems = [] }) => {
        return createdLineItems.concat(updatedLineItems)
      }
    )

    refreshCartItemsWorkflow.runAsStep({
      input: { cart_id: cart.id, items: allItems },
    })

    emitEventStep({
      eventName: CartWorkflowEvents.UPDATED,
      data: { id: cart.id },
    })

    return new WorkflowResponse(void 0, {
      hooks: [validate, setPricingContext] as const,
    })
  }
)
