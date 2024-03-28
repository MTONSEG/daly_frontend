import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

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


const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['basket', 'favourites'],
	blacklist: ['header', 'filters', 'catalogProducts']
}

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		basket: basketSlice,
		favourites: favouritesSlice,
		header: headerSlice,
		filters: filtersSlice,
		catalogProducts: catalogProductsSlice,
		[catalogHeaderApi.reducerPath]: catalogHeaderApi.reducer,
		product: productSlice,
		[getProductApi.reducerPath]: getProductApi.reducer,
		[commentApi.reducerPath]: commentApi.reducer,
		[novaPostAdressesApi.reducerPath]: novaPostAdressesApi.reducer
	})
)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
	getDefaultMiddleware()
		.concat(catalogHeaderApi.middleware)
		.concat(getProductApi.middleware)
		.concat(commentApi.middleware)
		.concat(novaPostAdressesApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
