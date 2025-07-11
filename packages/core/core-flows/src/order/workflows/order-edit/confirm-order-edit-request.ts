import {
  BigNumberInput,
  OrderChangeDTO,
  OrderDTO,
  OrderPreviewDTO,
} from "@medusajs/framework/types"
import {
  ChangeActionType,
  MathBN,
  OrderChangeStatus,
  OrderEditWorkflowEvents,
} from "@medusajs/framework/utils"
import {
  WorkflowResponse,
  createStep,
  createWorkflow,
  transform,
} from "@medusajs/framework/workflows-sdk"
import { reserveInventoryStep } from "../../../cart/steps/reserve-inventory"
import {
  prepareConfirmInventoryInput,
  requiredOrderFieldsForInventoryConfirmation,
} from "../../../cart/utils/prepare-confirm-inventory-input"
import { emitEventStep, useRemoteQueryStep } from "../../../common"
import { deleteReservationsByLineItemsStep } from "../../../reservation"
import { previewOrderChangeStep } from "../../steps"
import { confirmOrderChanges } from "../../steps/confirm-order-changes"
import {
  throwIfIsCancelled,
  throwIfOrderChangeIsNotActive,
} from "../../utils/order-validation"
import { createOrUpdateOrderPaymentCollectionWorkflow } from "../create-or-update-order-payment-collection"

/**
 * The data to validate that a requested order edit can be confirmed.
 */
export type ConfirmOrderEditRequestValidationStepInput = {
  /**
   * The order's details.
   */
  order: OrderDTO
  /**
   * The order change's details.
   */
  orderChange: OrderChangeDTO
}

/**
 * This step validates that a requested order edit can be confirmed.
 * If the order is canceled or the order change is not active, the step will throw an error.
 *
 * :::note
 *
 * You can retrieve an order and order change details using [Query](https://docs.medusajs.com/learn/fundamentals/module-links/query),
 * or [useQueryGraphStep](https://docs.medusajs.com/resources/references/medusa-workflows/steps/useQueryGraphStep).
 *
 * :::
 *
 * @example
 * const data = confirmOrderEditRequestValidationStep({
 *   order: {
 *     id: "order_123",
 *     // other order details...
 *   },
 *   orderChange: {
 *     id: "orch_123",
 *     // other order change details...
 *   }
 * })
 */
export const confirmOrderEditRequestValidationStep = createStep(
  "validate-confirm-order-edit-request",
  async function ({
    order,
    orderChange,
  }: ConfirmOrderEditRequestValidationStepInput) {
    throwIfIsCancelled(order, "Order")
    throwIfOrderChangeIsNotActive({ orderChange })
  }
)

/**
 * The data to confirm an order edit request.
 */
export type ConfirmOrderEditRequestWorkflowInput = {
  /**
   * The ID of the order to confirm the edit for.
   */
  order_id: string
  /**
   * The ID of the user confirming the edit.
   */
  confirmed_by?: string
}

export const confirmOrderEditRequestWorkflowId = "confirm-order-edit-request"
/**
 * This workflow confirms an order edit request. It's used by the
 * [Confirm Order Edit Admin API Route](https://docs.medusajs.com/api/admin#order-edits_postordereditsidconfirm).
 *
 * You can use this workflow within your customizations or your own custom workflows, allowing you to confirm an order edit
 * in your custom flow.
 *
 * @example
 * const { result } = await confirmOrderEditRequestWorkflow(container)
 * .run({
 *   input: {
 *     order_id: "order_123",
 *   }
 * })
 *
 * @summary
 *
 * Confirm an order edit request.
 */
export const confirmOrderEditRequestWorkflow = createWorkflow(
  confirmOrderEditRequestWorkflowId,
  function (
    input: ConfirmOrderEditRequestWorkflowInput
  ): WorkflowResponse<OrderPreviewDTO> {
    const order: OrderDTO = useRemoteQueryStep({
      entry_point: "orders",
      fields: [
        "id",
        "version",
        "canceled_at",
        "items.id",
        "items.title",
        "items.variant_title",
        "items.variant_sku",
        "items.variant_barcode",
        "shipping_address.*",
      ],
      variables: { id: input.order_id },
      list: false,
      throw_if_key_not_found: true,
    }).config({ name: "order-query" })

    const orderChange: OrderChangeDTO = useRemoteQueryStep({
      entry_point: "order_change",
      fields: [
        "id",
        "status",
        "actions.id",
        "actions.order_id",
        "actions.return_id",
        "actions.action",
        "actions.details",
        "actions.reference",
        "actions.reference_id",
        "actions.internal_note",
      ],
      variables: {
        filters: {
          order_id: input.order_id,
          status: [OrderChangeStatus.PENDING, OrderChangeStatus.REQUESTED],
        },
      },
      list: false,
    }).config({ name: "order-change-query" })

    confirmOrderEditRequestValidationStep({
      order,
      orderChange,
    })

    const orderPreview = previewOrderChangeStep(order.id)

    confirmOrderChanges({
      changes: [orderChange],
      orderId: order.id,
      confirmed_by: input.confirmed_by,
    })

    const orderItems = useRemoteQueryStep({
      entry_point: "order",
      fields: requiredOrderFieldsForInventoryConfirmation,
      variables: { id: input.order_id },
      list: false,
      throw_if_key_not_found: true,
    }).config({ name: "order-items-query" })

    const { variants, items, toRemoveReservationLineItemIds } = transform(
      { orderItems, previousOrderItems: order.items, orderPreview },
      ({ orderItems, previousOrderItems, orderPreview }) => {
        const allItems: any[] = []
        const allVariants: any[] = []

        const previousItemIds = (previousOrderItems || []).map(({ id }) => id)
        const currentItemIds = orderItems.items.map(({ id }) => id)

        const removedItemIds = previousItemIds.filter(
          (id) => !currentItemIds.includes(id)
        )

        const updatedItemIds: string[] = []

        orderItems.items.forEach((ordItem) => {
          const itemAction = orderPreview.items?.find(
            (item) =>
              item.id === ordItem.id &&
              item.actions?.find(
                (a) =>
                  a.action === ChangeActionType.ITEM_ADD ||
                  a.action === ChangeActionType.ITEM_UPDATE
              )
          )

          if (!itemAction) {
            return
          }

          const unitPrice: BigNumberInput =
            itemAction.raw_unit_price ?? itemAction.unit_price

          const compareAtUnitPrice: BigNumberInput | undefined =
            itemAction.raw_compare_at_unit_price ??
            itemAction.compare_at_unit_price

          const updateAction = itemAction.actions!.find(
            (a) => a.action === ChangeActionType.ITEM_UPDATE
          )

          if (updateAction) {
            updatedItemIds.push(ordItem.id)
          }

          const newQuantity: BigNumberInput =
            itemAction.raw_quantity ?? itemAction.quantity

          const reservationQuantity = MathBN.sub(
            newQuantity,
            ordItem.raw_fulfilled_quantity
          )

          allItems.push({
            id: ordItem.id,
            variant_id: ordItem.variant_id,
            quantity: reservationQuantity,
            unit_price: unitPrice,
            compare_at_unit_price: compareAtUnitPrice,
          })
          allVariants.push(ordItem.variant)
        })

        return {
          variants: allVariants,
          items: allItems,
          toRemoveReservationLineItemIds: [
            ...removedItemIds,
            ...updatedItemIds,
          ],
        }
      }
    )

    const formatedInventoryItems = transform(
      {
        input: {
          sales_channel_id: (orderItems as any).sales_channel_id,
          variants,
          items,
        },
      },
      prepareConfirmInventoryInput
    )

    deleteReservationsByLineItemsStep(toRemoveReservationLineItemIds)
    reserveInventoryStep(formatedInventoryItems)

    createOrUpdateOrderPaymentCollectionWorkflow.runAsStep({
      input: {
        order_id: order.id,
      },
    })

    const eventData = transform(
      { order, orderChange },
      ({ order, orderChange }) => {
        return {
          order_id: order.id,
          actions: orderChange.actions,
        }
      }
    )

    emitEventStep({
      eventName: OrderEditWorkflowEvents.CONFIRMED,
      data: eventData,
    })

    return new WorkflowResponse(orderPreview)
  }
)
