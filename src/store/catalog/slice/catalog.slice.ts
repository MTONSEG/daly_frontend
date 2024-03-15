'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IFilter, IProduct, IResponse } from '@/types/types'
import { RootState } from '../../store'
import { getData } from '@/services/axios.config'
import { catalogProductsState, filtersState } from '@/store/states'

export const fetchFilteredProducts =
	createAsyncThunk <
	IResponse<IProduct[]>, string, { state: RootState; rejectValue: string }>(
		'catalogProducts/fetchFilteredProducts',
		async (url, { rejectWithValue }) => {
			try {
				const data = await getData<IResponse<IProduct[]>>(url)

				return data
			} catch (error: any) {
				console.error('Error getting all product data:', error)
				return rejectWithValue(error)
			}
		}
	)

const catalogProducts = createSlice({
	name: 'catalogProducts',
	initialState: catalogProductsState,
	reducers: {
		setGridMode: (state, action: { payload: { mode: 'card' | 'row' } }) => {
			state.gridMode = action.payload.mode
		}
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
				state.catalogProducts = action.payload.data
				state.meta = action.payload.meta
				// console.log('🚀 SUCCESSSSSSSSSSSSSSSSS', state.filtersData)
			})

			.addCase(fetchFilteredProducts.rejected, (state) => {
				state.status = 'error'
				state.error = 'Cant throw you a good error('
			})
	}
})

export const { setGridMode } = catalogProducts.actions
export default catalogProducts.reducer
