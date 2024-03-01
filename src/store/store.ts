import { catalogHeaderApi } from '@/store/api/catalog-header.api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import basketSlice from './slices/basket.slice'
import favouritesSlice from './slices/favourites.slice'

export const store = configureStore({
	reducer: {
		basket: basketSlice,
		favourites: favouritesSlice, 
		[catalogHeaderApi.reducerPath]: catalogHeaderApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(catalogHeaderApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
