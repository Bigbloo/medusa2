/**
 * @schema AdminCreateGiftCardParams
 * type: object
 * description: The details of the gift card to create.
 * x-schemaName: AdminCreateGiftCardParams
 * required:
 *   - code
 *   - value
 *   - currency_code
 *   - expires_at
 *   - reference_id
 *   - reference
 *   - line_item_id
 *   - customer_id
 *   - metadata
 * properties:
 *   code:
 *     type: string
 *     title: code
 *     description: The gift card's code.
 *   value:
 *     type: number
 *     title: value
 *     description: The gift card's amount.
 *     example: 20
 *   currency_code:
 *     type: string
 *     title: currency_code
 *     description: The gift card's currency code.
 *     example: usd
 *   expires_at:
 *     type: string
 *     title: expires_at
 *     description: The date the gift card expires at.
 *   reference_id:
 *     type: string
 *     title: reference_id
 *     description: The gift card's reference ID.
 *   reference:
 *     type: string
 *     title: reference
 *     description: The gift card's reference.
 *   line_item_id:
 *     type: string
 *     title: line_item_id
 *     description: The ID of the line item associated with the gift card.
 *   customer_id:
 *     type: string
 *     title: customer_id
 *     description: The ID of the customer associated with the gift card.
 *   metadata:
 *     type: object
 *     description: The gift card's metadata, can hold custom key-value pairs.
 * 
*/

