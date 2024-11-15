import { combineReducers } from 'redux'
import { listingFilterApiSlice } from '@/services/listingFilterServices'
import { listingApiSlice } from '@/services/listingServices'
import { accountApiSlice } from '@/services/accountServices'

const rootReducer = combineReducers({
  [accountApiSlice.reducerPath]: accountApiSlice.reducer,
  [listingFilterApiSlice.reducerPath]: listingFilterApiSlice.reducer,
  [listingApiSlice.reducerPath]: listingApiSlice.reducer,
})

export default rootReducer
