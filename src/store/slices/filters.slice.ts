'use client'
import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	AsyncThunk
} from '@reduxjs/toolkit'
import { IFetchedFilters } from '@/types/types'
import { RootState } from '../store'
import { getData } from '@/services/axios.config'

export const fetchAllFilters = createAsyncThunk<
	IFetchedFilters[],
	void,
	{ state: RootState; rejectValue: string }
>(
	'filtersData/fetchAllFilters',
	async (_, { getState, rejectWithValue, dispatch }) => {

		try {
			const fetchedFilters: IFetchedFilters[] = await getData(
				'filters?locale=en&populate=brands,categories'
			)

			const allFilters = fetchedFilters
			console.log('🚀 ~ fetchAllFilters ~ allProducts:', allFilters)

			return allFilters
		} catch (error) {
			console.error('Error getting all product data:', error)
			return rejectWithValue('Text of error')
		}
	}
)

interface IFiltersData {
	productsData:  []
	error: null
	status: 'start'
}

const initialState: IFiltersData = {
	productsData: [],
	error: null,
	status: 'start'
}

const filtersData = createSlice({
	name: 'filtersData',
	initialState,
	reducers: {
		addHistoryProduct: (state, action) => {},

		removeHistoryProduct: (state, action) => {}
	}

	// extraReducers(builder) {
	// 	builder
	// 		.addCase(fetchAllProducts.pending, (state, action) => {
	// 			state.status = 'loading'
	// 			state.error = null
	// 		})
	// 		.addCase(fetchAllProducts.fulfilled, (state, action) => {
	// 			state.status = 'success'
	// 			state.error = null
	// 			state.productsData = action.payload
	// 			// console.log("🚀 ~ .addCase ~ action.payload:", action.payload)
	// 		})

	// 		.addCase(fetchAllProducts.rejected, (state, action) => {
	// 			state.status = 'error'
	// 			state.error = 'Cant throw you a good error('
	// 		})
	// }
})

export const { removeHistoryProduct, addHistoryProduct } = filtersData.actions

export default filtersData.reducer
