/**
 * @schema AdminShippingOptionRule
 * type: object
 * description: The shipping option rule's details.
 * x-schemaName: AdminShippingOptionRule
 * required:
 *   - id
 *   - attribute
 *   - operator
 *   - value
 *   - shipping_option_id
 *   - created_at
 *   - updated_at
 *   - deleted_at
 * properties:
 *   id:
 *     type: string
 *     title: id
 *     description: The shipping option rule's ID.
 *   attribute:
 *     type: string
 *     title: attribute
 *     description: The shipping option rule's attribute.
 *     example: is_return
 *   operator:
 *     type: string
 *     description: The rule's operator.
 *     enum:
 *       - gt
 *       - lt
 *       - eq
 *       - ne
 *       - in
 *       - lte
 *       - gte
 *       - nin
 *   value:
 *     oneOf:
 *       - type: string
 *         title: value
 *         description: The shipping option rule's value.
 *         example: "true"
 *       - type: array
 *         description: The shipping option rule's values.
 *         items:
 *           type: string
 *           title: value
 *           description: A value of the shipping option rule.
 *           example: "true"
 *   shipping_option_id:
 *     type: string
 *     title: shipping_option_id
 *     description: The ID of the shipping option this rule is for.
 *   created_at:
 *     type: string
 *     format: date-time
 *     title: created_at
 *     description: The date the shipping option rule was created.
 *   updated_at:
 *     type: string
 *     format: date-time
 *     title: updated_at
 *     description: The date the shipping option rule was updated.
 *   deleted_at:
 *     type: string
 *     format: date-time
 *     title: deleted_at
 *     description: The date the shipping option rule was deleted.
 * 
*/

