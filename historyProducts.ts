'use client'
import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from '@reduxjs/toolkit'

import { IProduct, categories } from '@/app/common/types/types'
import { RootState } from '../../store'
import { fetchVisitedProducts } from '@/app/lib/data'
import { IFavsData, addFavProduct } from '../favs/favsSlice'
import { addProduct } from '../basket/basketSlice'

interface IRemoveActionPayload {
	payload: number
}

export interface IHistoryProductsData {
	productsToLoad: {
		id: number
		category: categories
	}[]
	productsData: IProduct[]
	error: null | string
	status: 'start' | 'loading' | 'success' | 'error'
}

export const fetchAllProducts = createAsyncThunk<
	IProduct[],
	void,
	{ state: RootState; rejectValue: string }
>('historyProductsData/fetchAllProducts', async (_, { getState, rejectWithValue, dispatch }) => {
	const state = getState()
	// const productsToLoad = state.favs.products;
	const productsToLoad = state.historyProductsReducer.productsToLoad
	console.log('🚀 ~ fetchAllProducts ~ productsToLoad:', productsToLoad)

	try {
		const fetchedProducts = await Promise.all(
			productsToLoad.map(async (product) => {
				const productData = await fetchVisitedProducts(product.category, product.id)
				return productData
			})
		)

		const allProducts = fetchedProducts.flat()
		console.log('🚀 ~ fetchAllProducts ~ allProducts:', allProducts)

		// dispatch(addProduct);

		return allProducts
	} catch (error) {
		console.error('Error getting all product data:', error)
		// throw error;
		return rejectWithValue('Text of error')
	}
})

const initialState: IHistoryProductsData = {
	productsToLoad: [],
	productsData: [],
	error: null,
	status: 'start'
}

const historyProductsData = createSlice({
	name: 'historyProductsData',
	initialState,
	reducers: {
		addHistoryProduct: (state, action) => {
			console.log('🚀 ~ state.productsToLoad:', state.productsToLoad)

			const { id, category } = action.payload

			const existingIndex = state.productsToLoad.findIndex((product) => product.id === id)

			if (existingIndex === -1) {
				// Check if products exceed length of 10
				if (state.productsToLoad.length >= 10) {
					// Remove the last element if the limit is reached
					state.productsToLoad.pop()
				}
				// Add the product if it doesn't exist
				state.productsToLoad.unshift({ id, category })
			}
		},

		removeHistoryProduct: (state, action: IRemoveActionPayload) => {
			const indexToRemove = action.payload // Assuming payload contains the index of the product to remove

			if (indexToRemove !== -1) {
				state.productsToLoad.splice(indexToRemove, 1)
			}
		}
	},

	extraReducers(builder) {
		builder
			.addCase(fetchAllProducts.pending, (state, action) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				state.status = 'success'
				state.error = null
				state.productsData = action.payload
				// console.log("🚀 ~ .addCase ~ action.payload:", action.payload)
			})

			.addCase(fetchAllProducts.rejected, (state, action) => {
				state.status = 'error'
				state.error = 'Cant throw you a good error('
			})
	}
})

export const { removeHistoryProduct, addHistoryProduct } = historyProductsData.actions

export default historyProductsData.reducer
