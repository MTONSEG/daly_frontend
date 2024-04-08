import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import basketSlice from './basket/basket.slice'
import favouritesSlice from './favourites/favourites.slice'
import { catalogHeaderApi } from '@/store/header/header.api'
import headerSlice from '@/store/header/header.slice'
import filtersSlice from './filters/slice/filters.slice'
import catalogProductsSlice from './catalog/slice/catalog.slice'
import { getProductApi } from './api/productRTKQ.api'
// import productSlice from './slices/productRTK.slice'
import productSlice from '@/store/slices/product.slice'
import { commentApi } from './api/comment.api'
import { novaPostAdressesApi } from './api/novaPost.api'
import { homeApi } from './api/home.api'

export const store = configureStore({
	reducer: {
		basket: basketSlice,
		favourites: favouritesSlice,
		header: headerSlice,
		filters: filtersSlice,
		catalogProducts: catalogProductsSlice,
		[catalogHeaderApi.reducerPath]: catalogHeaderApi.reducer,
		product: productSlice,
		[getProductApi.reducerPath]: getProductApi.reducer,
		[commentApi.reducerPath]: commentApi.reducer,
		[novaPostAdressesApi.reducerPath]: novaPostAdressesApi.reducer,
		[homeApi.reducerPath]: homeApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(catalogHeaderApi.middleware)
			.concat(getProductApi.middleware)
			.concat(commentApi.middleware)
			.concat(novaPostAdressesApi.middleware)
			.concat(homeApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
