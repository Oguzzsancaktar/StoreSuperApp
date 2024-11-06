import { combineReducers } from 'redux'
import { listingFilterApiSlice } from '@/services/listingFilterServices'
import { listingApiSlice } from '@/services/listingServices'

const rootReducer = combineReducers({
  [listingFilterApiSlice.reducerPath]: listingFilterApiSlice.reducer,
  [listingApiSlice.reducerPath]: listingApiSlice.reducer,
})

export default rootReducer
