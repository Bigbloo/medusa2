/**
 * @oas [get] /store/store-credit-accounts
 * operationId: GetStoreCreditAccounts
 * summary: List Customer's Store Credit Accounts
 * x-sidebar-summary: List Store Credit Accounts
 * description: Retrieve the logged-in customer's store credit accounts. The store credit accounts can be filtered by fields such as `id`. The store credit accounts can also be sorted or paginated.
 * x-authenticated: true
 * x-ignoreCleanup: true
 * parameters:
 *   - name: x-publishable-api-key
 *     in: header
 *     description: Publishable API Key created in the Medusa Admin.
 *     required: true
 *     schema:
 *       type: string
 *       externalDocs:
 *         url: https://docs.medusajs.com/api/store#publishable-api-key
 *   - name: currency_code
 *     in: query
 *     description: Filter by the store credit account's currency code.
 *     required: false
 *     schema:
 *       type: string
 *       title: currency_code
 *       description: Filter by the store credit account's currency code.
 *       example: usd
 *   - name: created_at
 *     in: query
 *     description: Filter by a store credit account's creation date.
 *     required: false
 *     schema:
 *       type: object
 *       description: Filter by a store credit account's creation date.
 *       properties:
 *         $and:
 *           type: array
 *           description: Join query parameters with an AND condition. Each object's content is the same type as the expected query parameters.
 *           items:
 *             type: object
 *           title: $and
 *         $or:
 *           type: array
 *           description: Join query parameters with an OR condition. Each object's content is the same type as the expected query parameters.
 *           items:
 *             type: object
 *           title: $or
 *         $eq:
 *           oneOf:
 *             - type: string
 *               title: $eq
 *               description: Filter by an exact match.
 *             - type: array
 *               description: Filter by an exact match.
 *               items:
 *                 type: string
 *                 title: $eq
 *                 description: Filter by an exact match.
 *         $ne:
 *           type: string
 *           title: $ne
 *           description: Filter by values not equal to this parameter.
 *         $in:
 *           type: array
 *           description: Filter by values in this array.
 *           items:
 *             type: string
 *             title: $in
 *             description: Filter by values in this array.
 *         $nin:
 *           type: array
 *           description: Filter by values not in this array.
 *           items:
 *             type: string
 *             title: $nin
 *             description: Filter by values not in this array.
 *         $not:
 *           oneOf:
 *             - type: string
 *               title: $not
 *               description: Filter by values not matching the conditions in this parameter.
 *             - type: object
 *               description: Filter by values not matching the conditions in this parameter.
 *             - type: array
 *               description: Filter by values not matching the conditions in this parameter.
 *               items:
 *                 type: string
 *                 title: $not
 *                 description: Filter by values not matching the conditions in this parameter.
 *         $gt:
 *           type: string
 *           title: $gt
 *           description: Filter by values greater than this parameter. Useful for numbers and dates only.
 *         $gte:
 *           type: string
 *           title: $gte
 *           description: Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
 *         $lt:
 *           type: string
 *           title: $lt
 *           description: Filter by values less than this parameter. Useful for numbers and dates only.
 *         $lte:
 *           type: string
 *           title: $lte
 *           description: Filter by values less than or equal to this parameter. Useful for numbers and dates only.
 *         $like:
 *           type: string
 *           title: $like
 *           description: Apply a `like` filter. Useful for strings only.
 *         $re:
 *           type: string
 *           title: $re
 *           description: Apply a regex filter. Useful for strings only.
 *         $ilike:
 *           type: string
 *           title: $ilike
 *           description: Apply a case-insensitive `like` filter. Useful for strings only.
 *         $fulltext:
 *           type: string
 *           title: $fulltext
 *           description: Filter to apply on full-text properties.
 *         $overlap:
 *           type: array
 *           description: Filter arrays that have overlapping values with this parameter.
 *           items:
 *             type: string
 *             title: $overlap
 *             description: Filter arrays that have overlapping values with this parameter.
 *         $contains:
 *           type: array
 *           description: Filter arrays that contain some of the values of this parameter.
 *           items:
 *             type: string
 *             title: $contains
 *             description: Filter arrays that contain some of the values of this parameter.
 *         $contained:
 *           type: array
 *           description: Filter arrays that contain all values of this parameter.
 *           items:
 *             type: string
 *             title: $contained
 *             description: Filter arrays that contain all values of this parameter.
 *         $exists:
 *           type: boolean
 *           title: $exists
 *           description: Filter by whether a value for this parameter exists (not `null`).
 *   - name: updated_at
 *     in: query
 *     description: Filter by a store credit account's update date.
 *     required: false
 *     schema:
 *       type: object
 *       description: Filter by a store credit account's update date.
 *       properties:
 *         $and:
 *           type: array
 *           description: Join query parameters with an AND condition. Each object's content is the same type as the expected query parameters.
 *           items:
 *             type: object
 *           title: $and
 *         $or:
 *           type: array
 *           description: Join query parameters with an OR condition. Each object's content is the same type as the expected query parameters.
 *           items:
 *             type: object
 *           title: $or
 *         $eq:
 *           oneOf:
 *             - type: string
 *               title: $eq
 *               description: Filter by an exact match.
 *             - type: array
 *               description: Filter by an exact match.
 *               items:
 *                 type: string
 *                 title: $eq
 *                 description: Filter by an exact match.
 *         $ne:
 *           type: string
 *           title: $ne
 *           description: Filter by values not equal to this parameter.
 *         $in:
 *           type: array
 *           description: Filter by values in this array.
 *           items:
 *             type: string
 *             title: $in
 *             description: Filter by values in this array.
 *         $nin:
 *           type: array
 *           description: Filter by values not in this array.
 *           items:
 *             type: string
 *             title: $nin
 *             description: Filter by values not in this array.
 *         $not:
 *           oneOf:
 *             - type: string
 *               title: $not
 *               description: Filter by values not matching the conditions in this parameter.
 *             - type: object
 *               description: Filter by values not matching the conditions in this parameter.
 *             - type: array
 *               description: Filter by values not matching the conditions in this parameter.
 *               items:
 *                 type: string
 *                 title: $not
 *                 description: Filter by values not matching the conditions in this parameter.
 *         $gt:
 *           type: string
 *           title: $gt
 *           description: Filter by values greater than this parameter. Useful for numbers and dates only.
 *         $gte:
 *           type: string
 *           title: $gte
 *           description: Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
 *         $lt:
 *           type: string
 *           title: $lt
 *           description: Filter by values less than this parameter. Useful for numbers and dates only.
 *         $lte:
 *           type: string
 *           title: $lte
 *           description: Filter by values less than or equal to this parameter. Useful for numbers and dates only.
 *         $like:
 *           type: string
 *           title: $like
 *           description: Apply a `like` filter. Useful for strings only.
 *         $re:
 *           type: string
 *           title: $re
 *           description: Apply a regex filter. Useful for strings only.
 *         $ilike:
 *           type: string
 *           title: $ilike
 *           description: Apply a case-insensitive `like` filter. Useful for strings only.
 *         $fulltext:
 *           type: string
 *           title: $fulltext
 *           description: Filter to apply on full-text properties.
 *         $overlap:
 *           type: array
 *           description: Filter arrays that have overlapping values with this parameter.
 *           items:
 *             type: string
 *             title: $overlap
 *             description: Filter arrays that have overlapping values with this parameter.
 *         $contains:
 *           type: array
 *           description: Filter arrays that contain some of the values of this parameter.
 *           items:
 *             type: string
 *             title: $contains
 *             description: Filter arrays that contain some of the values of this parameter.
 *         $contained:
 *           type: array
 *           description: Filter arrays that contain all values of this parameter.
 *           items:
 *             type: string
 *             title: $contained
 *             description: Filter arrays that contain all values of this parameter.
 *         $exists:
 *           type: boolean
 *           title: $exists
 *           description: Filter by whether a value for this parameter exists (not `null`).
 *   - name: limit
 *     in: query
 *     description: Limit the number of items returned in the list.
 *     required: false
 *     schema:
 *       type: number
 *       title: limit
 *       description: Limit the number of items returned in the list.
 *       externalDocs:
 *         url: "#pagination"
 *   - name: offset
 *     in: query
 *     description: The number of items to skip when retrieving a list.
 *     required: false
 *     schema:
 *       type: number
 *       title: offset
 *       description: The number of items to skip when retrieving a list.
 *       externalDocs:
 *         url: "#pagination"
 *   - name: order
 *     in: query
 *     description: The field to sort the data by. By default, the sort order is ascending. To change the order to descending, prefix the field name with `-`.
 *     required: false
 *     schema:
 *       type: string
 *       title: order
 *       description: The field to sort the data by. By default, the sort order is ascending. To change the order to descending, prefix the field name with `-`.
 *       externalDocs:
 *         url: "#pagination"
 *   - name: fields
 *     in: query
 *     description: Comma-separated fields that should be included in the returned data. If a field is prefixed with `+` it will be added to the default fields, using `-` will remove it from the default
 *       fields. Without prefix it will replace the entire default fields.
 *     required: false
 *     schema:
 *       type: string
 *       title: fields
 *       description: Comma-separated fields that should be included in the returned data. If a field is prefixed with `+` it will be added to the default fields, using `-` will remove it from the default
 *         fields. Without prefix it will replace the entire default fields.
 *       externalDocs:
 *         url: "#select-fields-and-relations"
 *   - name: $and
 *     in: query
 *     description: Join query parameters with an AND condition. Each object's content is the same type as the expected query parameters.
 *     required: false
 *     schema:
 *       type: array
 *       description: Join query parameters with an AND condition. Each object's content is the same type as the expected query parameters.
 *       items:
 *         type: object
 *       title: $and
 *   - name: $or
 *     in: query
 *     description: Join query parameters with an OR condition. Each object's content is the same type as the expected query parameters.
 *     required: false
 *     schema:
 *       type: array
 *       description: Join query parameters with an OR condition. Each object's content is the same type as the expected query parameters.
 *       items:
 *         type: object
 *       title: $or
 * x-codeSamples:
 *   - lang: Shell
 *     label: cURL
 *     source: |-
 *       curl '{backend_url}/store/store-credit-accounts' \
 *       -H 'x-publishable-api-key: {your_publishable_api_key}'
 * tags:
 *   - Store Credit Accounts
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/StoreStoreCreditAccountsResponse"
 *   "400":
 *     $ref: "#/components/responses/400_error"
 *   "401":
 *     $ref: "#/components/responses/unauthorized"
 *   "404":
 *     $ref: "#/components/responses/not_found_error"
 *   "409":
 *     $ref: "#/components/responses/invalid_state_error"
 *   "422":
 *     $ref: "#/components/responses/invalid_request_error"
 *   "500":
 *     $ref: "#/components/responses/500_error"
 * security:
 *   - cookie_auth: []
 *   - jwt_token: []
 * x-badges:
 *   - text: Cloud
 *     description: |
 *       This API route is only available in [Medusa Cloud](https://docs.medusajs.com/cloud/loyalty-plugin).
 * 
*/

