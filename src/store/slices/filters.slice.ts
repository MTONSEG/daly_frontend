'use client'
import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	AsyncThunk
} from '@reduxjs/toolkit'
import { IFilter, IResponse } from '@/types/types'
import { RootState } from '../store'
import { getData } from '@/services/axios.config'

export const fetchAllFilters = createAsyncThunk<
	IFilter[] ,
	void,
	{ state: RootState; rejectValue: string }
>(
	'filtersData/fetchAllFilters',
	async (_, { getState, rejectWithValue, dispatch }) => {

		try {
			const data = await getData<IResponse<IFilter[]>> (
				'filters?locale=en&populate=brands,categories'
            )

			return data.data
		} catch (error) {
			console.error('Error getting all product data:', error)
			return rejectWithValue('Text of error')
		}
	}
)

interface IFiltersState {
	productsData:  []
	error: null
	status: 'start'
}

const initialState: IFiltersState = {
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
