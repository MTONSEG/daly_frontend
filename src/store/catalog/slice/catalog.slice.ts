'use client'
import { createSlice } from '@reduxjs/toolkit'
import { catalogProductsState } from '@/store/states'
import { fetchFilteredProducts } from '../catalog.api'

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
