import { QueryClient } from "@tanstack/react-query"

import { HttpTypes } from "@medusajs/types"
import { reviewsQueryKeys } from "../../../hooks/api/reviews"
import { sdk } from "../../../lib/client"
import { queryClient } from "../../../lib/query-client"

const reviewsListQuery = () => ({
  queryKey: reviewsQueryKeys.list({
    limit: 20,
    offset: 0,
    is_giftcard: false,
  }),
  queryFn: async () =>
    sdk.admin.product.list({ limit: 20, offset: 0, is_giftcard: false }),
})

export const reviewsLoader = (client: QueryClient) => {
  return async () => {
    const query = reviewsListQuery()

    return (
      queryClient.getQueryData(
        query.queryKey
      ) ?? (await client.fetchQuery(query))
    )
  }
}
