import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@/store/combineReducers'
import storeMiddlewares from '@/store/storeMiddlewares'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(storeMiddlewares)
})

export type IRootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type IAppDispatch = typeof store.dispatch


