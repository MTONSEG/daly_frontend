'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IFilter, IProduct, IResponse } from '@/types/types'
import { RootState } from '../../store'
import { getData } from '@/services/axios.config'
import { catalogProductsState, filtersState } from '@/store/states'

export const fetchFilteredProducts = createAsyncThunk<
	IProduct[],
	string,
	{ state: RootState; rejectValue: string }
>('catalogProducts/fetchFilteredProducts', async (url, { rejectWithValue }) => {
	try {
		const data = await getData<IResponse<IProduct[]>>(url)

		return data.data
	} catch (error: any) {
		console.error('Error getting all product data:', error)
		return rejectWithValue(error)
	}
})

const catalogProducts = createSlice({
	name: 'catalogProducts',
	initialState: catalogProductsState,
	reducers: {
		addHistoryProduct: (state, action) => {},

		removeHistoryProduct: (state, action) => {}
	},

	extraReducers(builder) {
		builder
			.addCase(fetchFilteredProducts.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
				state.status = 'success'
				state.error = null
				state.catalogProducts = action.payload
				// console.log('🚀 SUCCESSSSSSSSSSSSSSSSS', state.filtersData)
			})

			.addCase(fetchFilteredProducts.rejected, (state) => {
				state.status = 'error'
				state.error = 'Cant throw you a good error('
			})
	}
})

export const { removeHistoryProduct, addHistoryProduct } =
	catalogProducts.actions
export default catalogProducts.reducer
