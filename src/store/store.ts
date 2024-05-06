import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { setupListeners } from '@reduxjs/toolkit/query'
import basketSlice from './basket/basket.slice'
import favouritesSlice from './favourites/favourites.slice'
import comparisonSLice from './comparison/comparison.slice'
import { catalogHeaderApi } from '@/store/header/header.api'
import headerSlice from '@/store/header/header.slice'
import filtersSlice from './filters/slice/filters.slice'
import catalogProductsSlice from './catalog/slice/catalog.slice'
import { getProductApi } from './api/productRTKQ.api'
// import productSlice from './slices/productRTK.slice'
import productSlice from '@/store/slices/product.slice'
import { commentApi } from './api/comment.api'
import { novaPostAdressesApi } from './api/novaPost.api'
import { homeApi } from '@/store/api/home.api'
import { subscribeApi } from './api/subscribe.api'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['basket', 'favourites', 'comparison'],
	blacklist: ['header', 'filters', 'catalogProducts']
}

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		basket: basketSlice,
		favourites: favouritesSlice,
		comparison: comparisonSLice,
		header: headerSlice,
		filters: filtersSlice,
		catalogProducts: catalogProductsSlice,
		[catalogHeaderApi.reducerPath]: catalogHeaderApi.reducer,
		product: productSlice,
		[getProductApi.reducerPath]: getProductApi.reducer,
		[commentApi.reducerPath]: commentApi.reducer,
		[novaPostAdressesApi.reducerPath]: novaPostAdressesApi.reducer,
		[homeApi.reducerPath]: homeApi.reducer,
		[subscribeApi.reducerPath]: subscribeApi.reducer
	})
)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
			.concat(catalogHeaderApi.middleware)
			.concat(getProductApi.middleware)
			.concat(commentApi.middleware)
			.concat(novaPostAdressesApi.middleware)
			.concat(homeApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
