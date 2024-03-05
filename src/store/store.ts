import { catalogHeaderApi } from '@/store/api/header.api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import basketSlice from './slices/basket.slice'
import favouritesSlice from './slices/favourites.slice'
import { getProductApi } from './api/productRTKQ.api'
// import productSlice from './slices/productRTK.slice'

export const store = configureStore({
	reducer: {
		basket: basketSlice,
		favourites: favouritesSlice,
		// productSlice: productSlice,
		[catalogHeaderApi.reducerPath]: catalogHeaderApi.reducer,
		[getProductApi.reducerPath]: getProductApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(catalogHeaderApi.middleware).concat(getProductApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
