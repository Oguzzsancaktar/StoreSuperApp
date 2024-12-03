import { accountApiSlice } from "@/services/accountServices"
import { chatApiSlice } from "@/services/chatServices"
import { listingFilterApiSlice } from "@/services/listingFilterServices"
import { listingApiSlice } from "@/services/listingServices"

const storeMiddlewares = [
  accountApiSlice.middleware,
  listingApiSlice.middleware,
  listingFilterApiSlice.middleware,
  chatApiSlice.middleware
]

export default storeMiddlewares
