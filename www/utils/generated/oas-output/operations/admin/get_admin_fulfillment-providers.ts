/**
 * @oas [get] /admin/fulfillment-providers
 * operationId: GetFulfillmentProviders
 * summary: List Fulfillment Providers
 * description: Retrieve a list of fulfillment providers. The fulfillment providers can be filtered by fields such as `id`. The fulfillment providers can also be sorted or paginated.
 * x-authenticated: true
 * parameters:
 *   - name: fields
 *     in: query
 *     description: Comma-separated fields that should be included in the returned data. if a field is prefixed with `+` it will be added to the default fields, using `-` will remove it from the default
 *       fields. without prefix it will replace the entire default fields.
 *     required: false
 *     schema:
 *       type: string
 *       title: fields
 *       description: Comma-separated fields that should be included in the returned data. if a field is prefixed with `+` it will be added to the default fields, using `-` will remove it from the default
 *         fields. without prefix it will replace the entire default fields.
 *       externalDocs:
 *         url: "#select-fields-and-relations"
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
 *   - name: order
 *     in: query
 *     description: The field to sort the data by. By default, the sort order is ascending. To change the order to descending, prefix the field name with `-`.
 *     required: false
 *     schema:
 *       type: string
 *       title: order
 *       description: The field to sort the data by. By default, the sort order is ascending. To change the order to descending, prefix the field name with `-`.
 *   - name: id
 *     in: query
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: id
 *           description: Filter by a fulfillment provider's ID.
 *         - type: array
 *           description: Filter by fulfillment provider IDs.
 *           items:
 *             type: string
 *             title: id
 *             description: A fulfillment provider ID.
 *   - name: is_enabled
 *     in: query
 *     description: Filter by whether the fulfillment provider is enabled.
 *     required: false
 *     schema:
 *       type: boolean
 *       title: is_enabled
 *       description: Filter by whether the fulfillment provider is enabled.
 *   - name: q
 *     in: query
 *     description: Search term to filter a fulfillment provider's searchable properties.
 *     required: false
 *     schema:
 *       type: string
 *       title: q
 *       description: Search term to filter a fulfillment provider's searchable properties.
 *   - name: stock_location_id
 *     in: query
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: stock_location_id
 *           description: Filter by associated stock location's ID.
 *         - type: array
 *           description: Filter by associated stock location IDs.
 *           items:
 *             type: string
 *             title: stock_location_id
 *             description: A stock location's ID.
 *   - name: with_deleted
 *     in: query
 *     description: Whether to include deleted records in the result.
 *     required: false
 *     schema:
 *       type: boolean
 *       title: with_deleted
 *       description: Whether to include deleted records in the result.
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS SDK
 *     source: |-
 *       import Medusa from "@medusajs/js-sdk"
 * 
 *       export const sdk = new Medusa({
 *         baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
 *         debug: import.meta.env.DEV,
 *         auth: {
 *           type: "session",
 *         },
 *       })
 * 
 *       sdk.admin.fulfillmentProvider.list()
 *       .then(({ fulfillment_providers, count, limit, offset }) => {
 *         console.log(fulfillment_providers)
 *       })
 *   - lang: Shell
 *     label: cURL
 *     source: |-
 *       curl '{backend_url}/admin/fulfillment-providers' \
 *       -H 'Authorization: Bearer {access_token}'
 * tags:
 *   - Fulfillment Providers
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminFulfillmentProviderListResponse"
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
 * 
*/

