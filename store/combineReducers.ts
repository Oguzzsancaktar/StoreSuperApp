import { combineReducers } from 'redux'
import { listingFilterApiSlice } from '@/services/listingFilterServices'
import { listingApiSlice } from '@/services/listingServices'
import { accountApiSlice } from '@/services/accountServices'
import { chatApiSlice } from '@/services/chatServices'

const rootReducer = combineReducers({
  [accountApiSlice.reducerPath]: accountApiSlice.reducer,
  [listingFilterApiSlice.reducerPath]: listingFilterApiSlice.reducer,
  [listingApiSlice.reducerPath]: listingApiSlice.reducer,
  [chatApiSlice.reducerPath]: chatApiSlice.reducer
})

export default rootReducer
