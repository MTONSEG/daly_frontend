import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import basketSlice from './basket/basket.slice'
import favouritesSlice from './favourites/favourites.slice'
import { catalogHeaderApi } from '@/store/header/header.api'
import headerSlice from '@/store/header/header.slice'
import filtersSlice from './filters/slice/filters.slice'
import catalogProductsSlice from './catalog/slice/catalog.slice';
export const store = configureStore({
	reducer: {
		basket: basketSlice,
		favourites: favouritesSlice,
		header: headerSlice,
		filters: filtersSlice,
		catalogProducts: catalogProductsSlice,
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
