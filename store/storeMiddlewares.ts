import { listingFilterApiSlice } from "@/services/listingFilterServices"
import { listingApiSlice } from "@/services/listingServices"

const storeMiddlewares = [listingFilterApiSlice.middleware, listingApiSlice.middleware]

export default storeMiddlewares
