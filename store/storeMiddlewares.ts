import { accountApiSlice } from "@/services/accountServices"
import { listingFilterApiSlice } from "@/services/listingFilterServices"
import { listingApiSlice } from "@/services/listingServices"

const storeMiddlewares = [
  accountApiSlice.middleware,
  listingApiSlice.middleware,
  listingFilterApiSlice.middleware,
]

export default storeMiddlewares
