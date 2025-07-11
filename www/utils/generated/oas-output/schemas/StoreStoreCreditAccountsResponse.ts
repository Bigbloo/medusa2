/**
 * @schema StoreStoreCreditAccountsResponse
 * type: object
 * description: The paginated list of store credit accounts.
 * x-schemaName: StoreStoreCreditAccountsResponse
 * required:
 *   - limit
 *   - offset
 *   - count
 *   - store_credit_accounts
 * properties:
 *   limit:
 *     type: number
 *     title: limit
 *     description: The maximum number of store credit accounts to return.
 *   offset:
 *     type: number
 *     title: offset
 *     description: The number of store credit accounts to skip before retrieving the results.
 *   count:
 *     type: number
 *     title: count
 *     description: The total number of store credit accounts available.
 *   store_credit_accounts:
 *     type: array
 *     description: The list of store credit accounts.
 *     items:
 *       $ref: "#/components/schemas/StoreStoreCreditAccount"
 *   estimate_count:
 *     type: number
 *     title: estimate_count
 *     description: The store credit account's estimate count.
 *     x-featureFlag: index_engine
 * 
*/

