import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import basketSlice from './slices/basket.slice'
import favouritesSlice from './slices/favourites.slice'
import { catalogHeaderApi } from '@/store/header/header.api'
import headerSlice from '@/store/header/header.slice'
import { getProductApi } from './api/productRTKQ.api'
// import productSlice from './slices/productRTK.slice'
import productSlice from '@/store/slices/product.slice'
import { commentApi } from './api/comment.api'
import { novaPostAdressesApi } from './api/novaPost.api'

export const store = configureStore({
	reducer: {
		basket: basketSlice,
		favourites: favouritesSlice,
		header: headerSlice,
		product: productSlice,
		// productSlice: productSlice,
		[catalogHeaderApi.reducerPath]: catalogHeaderApi.reducer,
		[getProductApi.reducerPath]: getProductApi.reducer,
		[commentApi.reducerPath]: commentApi.reducer,
		[novaPostAdressesApi.reducerPath]: novaPostAdressesApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(catalogHeaderApi.middleware)
			.concat(getProductApi.middleware)
			.concat(commentApi.middleware)
			.concat(novaPostAdressesApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
