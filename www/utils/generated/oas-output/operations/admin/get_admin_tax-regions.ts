/**
 * @oas [get] /admin/tax-regions
 * operationId: GetTaxRegions
 * summary: List Tax Regions
 * description: Retrieve a list of tax regions. The tax regions can be filtered by fields such as `id`. The tax regions can also be sorted or paginated.
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
 *   - name: q
 *     in: query
 *     description: Search term to filter a tax region's searchable properties.
 *     required: false
 *     schema:
 *       type: string
 *       title: q
 *       description: Search term to filter a tax region's searchable properties.
 *   - name: id
 *     in: query
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: id
 *           description: Filter by a tax region ID.
 *         - type: array
 *           description: Filter by tax region IDs.
 *           items:
 *             type: string
 *             title: id
 *             description: A tax region ID.
 *   - name: country_code
 *     in: query
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: country_code
 *           description: Filter by a country code.
 *         - type: array
 *           description: Filter by country codes.
 *           items:
 *             type: string
 *             title: country_code
 *             description: A country code.
 *         - type: object
 *           description: Apply filters on the currency code.
 *           properties:
 *             $eq:
 *               type: string
 *               description: Filter by an exact match.
 *             $ne:
 *               type: string
 *               description: Filter by values not matching this parameter.
 *             $in:
 *               type: array
 *               description: Filter by values in this array's items.
 *               items:
 *                 type: string
 *             $nin:
 *               type: array
 *               description: Filter by values not in this array's items.
 *               items:
 *                 type: string
 *             $like:
 *               type: string
 *               description: Apply a `like` filter. Useful for strings only.
 *             $ilike:
 *               type: string
 *               description: Apply a case-insensitive `like` filter. Useful for strings only.
 *             $re:
 *               type: string
 *               description: Apply a regex filter. Useful for strings only.
 *             $contains:
 *               type: array
 *               description: Filter arrays that contain some of the values of this parameter.
 *               items:
 *                 type: string
 *             $gt:
 *               type: string
 *               description: Filter by values greater than this parameter. Useful for numbers and dates only.
 *             $gte:
 *               type: string
 *               description: Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
 *             $lt:
 *               type: string
 *               description: Filter by values less than this parameter. Useful for numbers and dates only.
 *             $lte:
 *               type: string
 *               description: Filter by values less than or equal to this parameter. Useful for numbers and dates only.
 *   - name: province_code
 *     in: query
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: province_code
 *           description: Filter by a ISO 3166-2 province code. Must be lower-case.
 *           example: us-ca
 *           externalDocs:
 *             url: https://en.wikipedia.org/wiki/ISO_3166-2
 *             description: Learn more about ISO 3166-2
 *         - type: array
 *           description: Filter by ISO 3166-2 province codes.
 *           items:
 *             type: string
 *             title: province_code
 *             description: A ISO 3166-2 province code.
 *             example: us-ca
 *             externalDocs:
 *               url: https://en.wikipedia.org/wiki/ISO_3166-2
 *               description: Learn more about ISO 3166-2
 *         - type: object
 *           description: Apply filters on the province code.
 *           properties:
 *             $eq:
 *               type: string
 *               description: Filter by an exact match.
 *             $ne:
 *               type: string
 *               description: Filter by values not matching this parameter.
 *             $in:
 *               type: array
 *               description: Filter by values in this array's items.
 *               items:
 *                 type: string
 *             $nin:
 *               type: array
 *               description: Filter by values not in this array's items.
 *               items:
 *                 type: string
 *             $like:
 *               type: string
 *               description: Apply a `like` filter. Useful for strings only.
 *             $ilike:
 *               type: string
 *               description: Apply a case-insensitive `like` filter. Useful for strings only.
 *             $re:
 *               type: string
 *               description: Apply a regex filter. Useful for strings only.
 *             $contains:
 *               type: array
 *               description: Filter arrays that contain some of the values of this parameter.
 *               items:
 *                 type: string
 *             $gt:
 *               type: string
 *               description: Filter by values greater than this parameter. Useful for numbers and dates only.
 *             $gte:
 *               type: string
 *               description: Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
 *             $lt:
 *               type: string
 *               description: Filter by values less than this parameter. Useful for numbers and dates only.
 *             $lte:
 *               type: string
 *               description: Filter by values less than or equal to this parameter. Useful for numbers and dates only.
 *   - name: parent_id
 *     in: query
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: parent_id
 *           description: Filter by the ID of a parent tax region to retrieve its child tax regions.
 *         - type: array
 *           description: Filter by the IDs of parent tax regions to retrieve their child tax regions.
 *           items:
 *             type: string
 *             title: parent_id
 *             description: A tax region's ID.
 *         - type: object
 *           description: Apply filters on the parent tax region's ID to retrieve its child tax regions.
 *           properties:
 *             $eq:
 *               type: string
 *               description: Filter by an exact match.
 *             $ne:
 *               type: string
 *               description: Filter by values not matching this parameter.
 *             $in:
 *               type: array
 *               description: Filter by values in this array's items.
 *               items:
 *                 type: string
 *             $nin:
 *               type: array
 *               description: Filter by values not in this array's items.
 *               items:
 *                 type: string
 *             $like:
 *               type: string
 *               description: Apply a `like` filter. Useful for strings only.
 *             $ilike:
 *               type: string
 *               description: Apply a case-insensitive `like` filter. Useful for strings only.
 *             $re:
 *               type: string
 *               description: Apply a regex filter. Useful for strings only.
 *             $contains:
 *               type: array
 *               description: Filter arrays that contain some of the values of this parameter.
 *               items:
 *                 type: string
 *             $gt:
 *               type: string
 *               description: Filter by values greater than this parameter. Useful for numbers and dates only.
 *             $gte:
 *               type: string
 *               description: Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
 *             $lt:
 *               type: string
 *               description: Filter by values less than this parameter. Useful for numbers and dates only.
 *             $lte:
 *               type: string
 *               description: Filter by values less than or equal to this parameter. Useful for numbers and dates only.
 *   - name: created_by
 *     in: query
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: created_by
 *           description: Filter by the ID of the user to retrieve the tax regions they created.
 *         - type: array
 *           description: Filter by user IDs to retrieve their tax regions they created.
 *           items:
 *             type: string
 *             title: created_by
 *             description: A user ID.
 *   - name: created_at
 *     in: query
 *     description: Filter by a tax region's creation date.
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: created_at
 *           description: Filter by a tax region's creation date.
 *         - type: object
 *           description: Apply filters on the tax region's creation date.
 *           properties:
 *             $and:
 *               type: array
 *               description: Join query parameters with an AND condition. Each object's content is the same type as the expected query parameters.
 *               items:
 *                 type: object
 *               title: $and
 *             $or:
 *               type: array
 *               description: Join query parameters with an OR condition. Each object's content is the same type as the expected query parameters.
 *               items:
 *                 type: object
 *               title: $or
 *             $eq:
 *               oneOf:
 *                 - type: string
 *                   title: $eq
 *                   description: Filter by an exact match.
 *                 - type: array
 *                   description: Filter by an exact match.
 *                   items:
 *                     type: string
 *                     title: $eq
 *                     description: Filter by an exact match.
 *             $ne:
 *               type: string
 *               title: $ne
 *               description: Filter by values not equal to this parameter.
 *             $in:
 *               type: array
 *               description: Filter by values in this array.
 *               items:
 *                 type: string
 *                 title: $in
 *                 description: Filter by values in this array.
 *             $nin:
 *               type: array
 *               description: Filter by values not in this array.
 *               items:
 *                 type: string
 *                 title: $nin
 *                 description: Filter by values not in this array.
 *             $not:
 *               oneOf:
 *                 - type: string
 *                   title: $not
 *                   description: Filter by values not matching the conditions in this parameter.
 *                 - type: object
 *                   description: Filter by values not matching the conditions in this parameter.
 *                   properties:
 *                     $and:
 *                       type: array
 *                       description: Join query parameters with an AND condition. Each object's content is the same type as the expected query parameters.
 *                       items:
 *                         type: object
 *                       title: $and
 *                     $or:
 *                       type: array
 *                       description: Join query parameters with an OR condition. Each object's content is the same type as the expected query parameters.
 *                       items:
 *                         type: object
 *                       title: $or
 *                     $eq:
 *                       oneOf:
 *                         - type: string
 *                           title: $eq
 *                           description: Filter by an exact match.
 *                         - type: array
 *                           description: Filter by an exact match.
 *                           items:
 *                             type: string
 *                             title: $eq
 *                             description: Filter by an exact match.
 *                     $ne:
 *                       type: string
 *                       title: $ne
 *                       description: Filter by values not equal to this parameter.
 *                     $in:
 *                       type: array
 *                       description: Filter by values in this array.
 *                       items:
 *                         type: string
 *                         title: $in
 *                         description: Filter by values in this array.
 *                     $nin:
 *                       type: array
 *                       description: Filter by values not in this array.
 *                       items:
 *                         type: string
 *                         title: $nin
 *                         description: Filter by values not in this array.
 *                     $not:
 *                       oneOf:
 *                         - type: string
 *                           title: $not
 *                           description: Filter by values not matching the conditions in this parameter.
 *                         - type: object
 *                           description: Filter by values not matching the conditions in this parameter.
 *                         - type: array
 *                           description: Filter by values not matching the conditions in this parameter.
 *                           items:
 *                             type: string
 *                             title: $not
 *                             description: Filter by values not matching the conditions in this parameter.
 *                     $gt:
 *                       type: string
 *                       title: $gt
 *                       description: Filter by values greater than this parameter. Useful for numbers and dates only.
 *                     $gte:
 *                       type: string
 *                       title: $gte
 *                       description: Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
 *                     $lt:
 *                       type: string
 *                       title: $lt
 *                       description: Filter by values less than this parameter. Useful for numbers and dates only.
 *                     $lte:
 *                       type: string
 *                       title: $lte
 *                       description: Filter by values less than or equal to this parameter. Useful for numbers and dates only.
 *                     $like:
 *                       type: string
 *                       title: $like
 *                       description: Apply a `like` filter. Useful for strings only.
 *                     $re:
 *                       type: string
 *                       title: $re
 *                       description: Apply a regex filter. Useful for strings only.
 *                     $ilike:
 *                       type: string
 *                       title: $ilike
 *                       description: Apply a case-insensitive `like` filter. Useful for strings only.
 *                     $fulltext:
 *                       type: string
 *                       title: $fulltext
 *                       description: Filter to apply on full-text properties.
 *                     $overlap:
 *                       type: array
 *                       description: Filter arrays that have overlapping values with this parameter.
 *                       items:
 *                         type: string
 *                         title: $overlap
 *                         description: Filter arrays that have overlapping values with this parameter.
 *                     $contains:
 *                       type: array
 *                       description: Filter arrays that contain some of the values of this parameter.
 *                       items:
 *                         type: string
 *                         title: $contains
 *                         description: Filter arrays that contain some of the values of this parameter.
 *                     $contained:
 *                       type: array
 *                       description: Filter arrays that contain all values of this parameter.
 *                       items:
 *                         type: string
 *                         title: $contained
 *                         description: Filter arrays that contain all values of this parameter.
 *                     $exists:
 *                       type: boolean
 *                       title: $exists
 *                       description: Filter by whether a value for this parameter exists (not `null`).
 *                 - type: array
 *                   description: Filter by values not matching the conditions in this parameter.
 *                   items:
 *                     type: string
 *                     title: $not
 *                     description: Filter by values not matching the conditions in this parameter.
 *             $gt:
 *               type: string
 *               title: $gt
 *               description: Filter by values greater than this parameter. Useful for numbers and dates only.
 *             $gte:
 *               type: string
 *               title: $gte
 *               description: Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
 *             $lt:
 *               type: string
 *               title: $lt
 *               description: Filter by values less than this parameter. Useful for numbers and dates only.
 *             $lte:
 *               type: string
 *               title: $lte
 *               description: Filter by values less than or equal to this parameter. Useful for numbers and dates only.
 *             $like:
 *               type: string
 *               title: $like
 *               description: Apply a `like` filter. Useful for strings only.
 *             $re:
 *               type: string
 *               title: $re
 *               description: Apply a regex filter. Useful for strings only.
 *             $ilike:
 *               type: string
 *               title: $ilike
 *               description: Apply a case-insensitive `like` filter. Useful for strings only.
 *             $fulltext:
 *               type: string
 *               title: $fulltext
 *               description: Filter to apply on full-text properties.
 *             $overlap:
 *               type: array
 *               description: Filter arrays that have overlapping values with this parameter.
 *               items:
 *                 type: string
 *                 title: $overlap
 *                 description: Filter arrays that have overlapping values with this parameter.
 *             $contains:
 *               type: array
 *               description: Filter arrays that contain some of the values of this parameter.
 *               items:
 *                 type: string
 *                 title: $contains
 *                 description: Filter arrays that contain some of the values of this parameter.
 *             $contained:
 *               type: array
 *               description: Filter arrays that contain all values of this parameter.
 *               items:
 *                 type: string
 *                 title: $contained
 *                 description: Filter arrays that contain all values of this parameter.
 *             $exists:
 *               type: boolean
 *               title: $exists
 *               description: Filter by whether a value for this parameter exists (not `null`).
 *   - name: updated_at
 *     in: query
 *     description: Filter by a tax region's update date.
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: updated_at
 *           description: Filter by a tax region's update date.
 *         - type: object
 *           description: Apply filters on the tax region's update date.
 *           properties:
 *             $and:
 *               type: array
 *               description: Join query parameters with an AND condition. Each object's content is the same type as the expected query parameters.
 *               items:
 *                 type: object
 *               title: $and
 *             $or:
 *               type: array
 *               description: Join query parameters with an OR condition. Each object's content is the same type as the expected query parameters.
 *               items:
 *                 type: object
 *               title: $or
 *             $eq:
 *               oneOf:
 *                 - type: string
 *                   title: $eq
 *                   description: Filter by an exact match.
 *                 - type: array
 *                   description: Filter by an exact match.
 *                   items:
 *                     type: string
 *                     title: $eq
 *                     description: Filter by an exact match.
 *             $ne:
 *               type: string
 *               title: $ne
 *               description: Filter by values not equal to this parameter.
 *             $in:
 *               type: array
 *               description: Filter by values in this array.
 *               items:
 *                 type: string
 *                 title: $in
 *                 description: Filter by values in this array.
 *             $nin:
 *               type: array
 *               description: Filter by values not in this array.
 *               items:
 *                 type: string
 *                 title: $nin
 *                 description: Filter by values not in this array.
 *             $not:
 *               oneOf:
 *                 - type: string
 *                   title: $not
 *                   description: Filter by values not matching the conditions in this parameter.
 *                 - type: object
 *                   description: Filter by values not matching the conditions in this parameter.
 *                   properties:
 *                     $and:
 *                       type: array
 *                       description: Join query parameters with an AND condition. Each object's content is the same type as the expected query parameters.
 *                       items:
 *                         type: object
 *                       title: $and
 *                     $or:
 *                       type: array
 *                       description: Join query parameters with an OR condition. Each object's content is the same type as the expected query parameters.
 *                       items:
 *                         type: object
 *                       title: $or
 *                     $eq:
 *                       oneOf:
 *                         - type: string
 *                           title: $eq
 *                           description: Filter by an exact match.
 *                         - type: array
 *                           description: Filter by an exact match.
 *                           items:
 *                             type: string
 *                             title: $eq
 *                             description: Filter by an exact match.
 *                     $ne:
 *                       type: string
 *                       title: $ne
 *                       description: Filter by values not equal to this parameter.
 *                     $in:
 *                       type: array
 *                       description: Filter by values in this array.
 *                       items:
 *                         type: string
 *                         title: $in
 *                         description: Filter by values in this array.
 *                     $nin:
 *                       type: array
 *                       description: Filter by values not in this array.
 *                       items:
 *                         type: string
 *                         title: $nin
 *                         description: Filter by values not in this array.
 *                     $not:
 *                       oneOf:
 *                         - type: string
 *                           title: $not
 *                           description: Filter by values not matching the conditions in this parameter.
 *                         - type: object
 *                           description: Filter by values not matching the conditions in this parameter.
 *                         - type: array
 *                           description: Filter by values not matching the conditions in this parameter.
 *                           items:
 *                             type: string
 *                             title: $not
 *                             description: Filter by values not matching the conditions in this parameter.
 *                     $gt:
 *                       type: string
 *                       title: $gt
 *                       description: Filter by values greater than this parameter. Useful for numbers and dates only.
 *                     $gte:
 *                       type: string
 *                       title: $gte
 *                       description: Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
 *                     $lt:
 *                       type: string
 *                       title: $lt
 *                       description: Filter by values less than this parameter. Useful for numbers and dates only.
 *                     $lte:
 *                       type: string
 *                       title: $lte
 *                       description: Filter by values less than or equal to this parameter. Useful for numbers and dates only.
 *                     $like:
 *                       type: string
 *                       title: $like
 *                       description: Apply a `like` filter. Useful for strings only.
 *                     $re:
 *                       type: string
 *                       title: $re
 *                       description: Apply a regex filter. Useful for strings only.
 *                     $ilike:
 *                       type: string
 *                       title: $ilike
 *                       description: Apply a case-insensitive `like` filter. Useful for strings only.
 *                     $fulltext:
 *                       type: string
 *                       title: $fulltext
 *                       description: Filter to apply on full-text properties.
 *                     $overlap:
 *                       type: array
 *                       description: Filter arrays that have overlapping values with this parameter.
 *                       items:
 *                         type: string
 *                         title: $overlap
 *                         description: Filter arrays that have overlapping values with this parameter.
 *                     $contains:
 *                       type: array
 *                       description: Filter arrays that contain some of the values of this parameter.
 *                       items:
 *                         type: string
 *                         title: $contains
 *                         description: Filter arrays that contain some of the values of this parameter.
 *                     $contained:
 *                       type: array
 *                       description: Filter arrays that contain all values of this parameter.
 *                       items:
 *                         type: string
 *                         title: $contained
 *                         description: Filter arrays that contain all values of this parameter.
 *                     $exists:
 *                       type: boolean
 *                       title: $exists
 *                       description: Filter by whether a value for this parameter exists (not `null`).
 *                 - type: array
 *                   description: Filter by values not matching the conditions in this parameter.
 *                   items:
 *                     type: string
 *                     title: $not
 *                     description: Filter by values not matching the conditions in this parameter.
 *             $gt:
 *               type: string
 *               title: $gt
 *               description: Filter by values greater than this parameter. Useful for numbers and dates only.
 *             $gte:
 *               type: string
 *               title: $gte
 *               description: Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
 *             $lt:
 *               type: string
 *               title: $lt
 *               description: Filter by values less than this parameter. Useful for numbers and dates only.
 *             $lte:
 *               type: string
 *               title: $lte
 *               description: Filter by values less than or equal to this parameter. Useful for numbers and dates only.
 *             $like:
 *               type: string
 *               title: $like
 *               description: Apply a `like` filter. Useful for strings only.
 *             $re:
 *               type: string
 *               title: $re
 *               description: Apply a regex filter. Useful for strings only.
 *             $ilike:
 *               type: string
 *               title: $ilike
 *               description: Apply a case-insensitive `like` filter. Useful for strings only.
 *             $fulltext:
 *               type: string
 *               title: $fulltext
 *               description: Filter to apply on full-text properties.
 *             $overlap:
 *               type: array
 *               description: Filter arrays that have overlapping values with this parameter.
 *               items:
 *                 type: string
 *                 title: $overlap
 *                 description: Filter arrays that have overlapping values with this parameter.
 *             $contains:
 *               type: array
 *               description: Filter arrays that contain some of the values of this parameter.
 *               items:
 *                 type: string
 *                 title: $contains
 *                 description: Filter arrays that contain some of the values of this parameter.
 *             $contained:
 *               type: array
 *               description: Filter arrays that contain all values of this parameter.
 *               items:
 *                 type: string
 *                 title: $contained
 *                 description: Filter arrays that contain all values of this parameter.
 *             $exists:
 *               type: boolean
 *               title: $exists
 *               description: Filter by whether a value for this parameter exists (not `null`).
 *   - name: deleted_at
 *     in: query
 *     description: Filter by a tax region's deletion date.
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: deleted_at
 *           description: Filter by a tax region's deletion date.
 *         - type: object
 *           description: Apply filters on the tax region's deletion date.
 *           properties:
 *             $and:
 *               type: array
 *               description: Join query parameters with an AND condition. Each object's content is the same type as the expected query parameters.
 *               items:
 *                 type: object
 *               title: $and
 *             $or:
 *               type: array
 *               description: Join query parameters with an OR condition. Each object's content is the same type as the expected query parameters.
 *               items:
 *                 type: object
 *               title: $or
 *             $eq:
 *               oneOf:
 *                 - type: string
 *                   title: $eq
 *                   description: Filter by an exact match.
 *                 - type: array
 *                   description: Filter by an exact match.
 *                   items:
 *                     type: string
 *                     title: $eq
 *                     description: Filter by an exact match.
 *             $ne:
 *               type: string
 *               title: $ne
 *               description: Filter by values not equal to this parameter.
 *             $in:
 *               type: array
 *               description: Filter by values in this array.
 *               items:
 *                 type: string
 *                 title: $in
 *                 description: Filter by values in this array.
 *             $nin:
 *               type: array
 *               description: Filter by values not in this array.
 *               items:
 *                 type: string
 *                 title: $nin
 *                 description: Filter by values not in this array.
 *             $not:
 *               oneOf:
 *                 - type: string
 *                   title: $not
 *                   description: Filter by values not matching the conditions in this parameter.
 *                 - type: object
 *                   description: Filter by values not matching the conditions in this parameter.
 *                   properties:
 *                     $and:
 *                       type: array
 *                       description: Join query parameters with an AND condition. Each object's content is the same type as the expected query parameters.
 *                       items:
 *                         type: object
 *                       title: $and
 *                     $or:
 *                       type: array
 *                       description: Join query parameters with an OR condition. Each object's content is the same type as the expected query parameters.
 *                       items:
 *                         type: object
 *                       title: $or
 *                     $eq:
 *                       oneOf:
 *                         - type: string
 *                           title: $eq
 *                           description: Filter by an exact match.
 *                         - type: array
 *                           description: Filter by an exact match.
 *                           items:
 *                             type: string
 *                             title: $eq
 *                             description: Filter by an exact match.
 *                     $ne:
 *                       type: string
 *                       title: $ne
 *                       description: Filter by values not equal to this parameter.
 *                     $in:
 *                       type: array
 *                       description: Filter by values in this array.
 *                       items:
 *                         type: string
 *                         title: $in
 *                         description: Filter by values in this array.
 *                     $nin:
 *                       type: array
 *                       description: Filter by values not in this array.
 *                       items:
 *                         type: string
 *                         title: $nin
 *                         description: Filter by values not in this array.
 *                     $not:
 *                       oneOf:
 *                         - type: string
 *                           title: $not
 *                           description: Filter by values not matching the conditions in this parameter.
 *                         - type: object
 *                           description: Filter by values not matching the conditions in this parameter.
 *                         - type: array
 *                           description: Filter by values not matching the conditions in this parameter.
 *                           items:
 *                             type: string
 *                             title: $not
 *                             description: Filter by values not matching the conditions in this parameter.
 *                     $gt:
 *                       type: string
 *                       title: $gt
 *                       description: Filter by values greater than this parameter. Useful for numbers and dates only.
 *                     $gte:
 *                       type: string
 *                       title: $gte
 *                       description: Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
 *                     $lt:
 *                       type: string
 *                       title: $lt
 *                       description: Filter by values less than this parameter. Useful for numbers and dates only.
 *                     $lte:
 *                       type: string
 *                       title: $lte
 *                       description: Filter by values less than or equal to this parameter. Useful for numbers and dates only.
 *                     $like:
 *                       type: string
 *                       title: $like
 *                       description: Apply a `like` filter. Useful for strings only.
 *                     $re:
 *                       type: string
 *                       title: $re
 *                       description: Apply a regex filter. Useful for strings only.
 *                     $ilike:
 *                       type: string
 *                       title: $ilike
 *                       description: Apply a case-insensitive `like` filter. Useful for strings only.
 *                     $fulltext:
 *                       type: string
 *                       title: $fulltext
 *                       description: Filter to apply on full-text properties.
 *                     $overlap:
 *                       type: array
 *                       description: Filter arrays that have overlapping values with this parameter.
 *                       items:
 *                         type: string
 *                         title: $overlap
 *                         description: Filter arrays that have overlapping values with this parameter.
 *                     $contains:
 *                       type: array
 *                       description: Filter arrays that contain some of the values of this parameter.
 *                       items:
 *                         type: string
 *                         title: $contains
 *                         description: Filter arrays that contain some of the values of this parameter.
 *                     $contained:
 *                       type: array
 *                       description: Filter arrays that contain all values of this parameter.
 *                       items:
 *                         type: string
 *                         title: $contained
 *                         description: Filter arrays that contain all values of this parameter.
 *                     $exists:
 *                       type: boolean
 *                       title: $exists
 *                       description: Filter by whether a value for this parameter exists (not `null`).
 *                 - type: array
 *                   description: Filter by values not matching the conditions in this parameter.
 *                   items:
 *                     type: string
 *                     title: $not
 *                     description: Filter by values not matching the conditions in this parameter.
 *             $gt:
 *               type: string
 *               title: $gt
 *               description: Filter by values greater than this parameter. Useful for numbers and dates only.
 *             $gte:
 *               type: string
 *               title: $gte
 *               description: Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
 *             $lt:
 *               type: string
 *               title: $lt
 *               description: Filter by values less than this parameter. Useful for numbers and dates only.
 *             $lte:
 *               type: string
 *               title: $lte
 *               description: Filter by values less than or equal to this parameter. Useful for numbers and dates only.
 *             $like:
 *               type: string
 *               title: $like
 *               description: Apply a `like` filter. Useful for strings only.
 *             $re:
 *               type: string
 *               title: $re
 *               description: Apply a regex filter. Useful for strings only.
 *             $ilike:
 *               type: string
 *               title: $ilike
 *               description: Apply a case-insensitive `like` filter. Useful for strings only.
 *             $fulltext:
 *               type: string
 *               title: $fulltext
 *               description: Filter to apply on full-text properties.
 *             $overlap:
 *               type: array
 *               description: Filter arrays that have overlapping values with this parameter.
 *               items:
 *                 type: string
 *                 title: $overlap
 *                 description: Filter arrays that have overlapping values with this parameter.
 *             $contains:
 *               type: array
 *               description: Filter arrays that contain some of the values of this parameter.
 *               items:
 *                 type: string
 *                 title: $contains
 *                 description: Filter arrays that contain some of the values of this parameter.
 *             $contained:
 *               type: array
 *               description: Filter arrays that contain all values of this parameter.
 *               items:
 *                 type: string
 *                 title: $contained
 *                 description: Filter arrays that contain all values of this parameter.
 *             $exists:
 *               type: boolean
 *               title: $exists
 *               description: Filter by whether a value for this parameter exists (not `null`).
 *   - name: $and
 *     in: query
 *     required: false
 *     schema:
 *       type: array
 *       description: Join query parameters with an AND condition. Each object's content is the same type as the expected query parameters.
 *       items:
 *         type: object
 *       title: $and
 *   - name: $or
 *     in: query
 *     required: false
 *     schema:
 *       type: array
 *       description: Join query parameters with an OR condition. Each object's content is the same type as the expected query parameters.
 *       items:
 *         type: object
 *       title: $or
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
 *       sdk.admin.taxRegion.list()
 *       .then(({ tax_regions, count, limit, offset }) => {
 *         console.log(tax_regions)
 *       })
 *   - lang: Shell
 *     label: cURL
 *     source: |-
 *       curl '{backend_url}/admin/tax-regions' \
 *       -H 'Authorization: Bearer {access_token}'
 * tags:
 *   - Tax Regions
 * responses:
 *   "200":
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           allOf:
 *             - type: object
 *               description: The paginated list of tax regions.
 *               required:
 *                 - limit
 *                 - offset
 *                 - count
 *               properties:
 *                 limit:
 *                   type: number
 *                   title: limit
 *                   description: The maximum number of items returned.
 *                 offset:
 *                   type: number
 *                   title: offset
 *                   description: The number of items skipped before retrieving the returned items.
 *                 count:
 *                   type: number
 *                   title: count
 *                   description: The total number of items.
 *             - type: object
 *               description: The paginated list of tax regions.
 *               required:
 *                 - tax_regions
 *               properties:
 *                 tax_regions:
 *                   type: array
 *                   description: The list of tax regions.
 *                   items:
 *                     $ref: "#/components/schemas/AdminTaxRegion"
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

