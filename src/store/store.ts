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
		[catalogHeaderApi.reducerPath]: catalogHeaderApi.reducer
	})
)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(catalogHeaderApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
