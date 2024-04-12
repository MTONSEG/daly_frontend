import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IComparisonData {
	products: number[]
}

const initialState: IComparisonData = {
	products: [ 333, 335]
	// products: []
}

const comparisonData = createSlice({
	name: 'comparisonData',
	initialState,
	reducers: {
		addComparisonProduct: (state, action: PayloadAction<number>) => {
			const productId = action.payload
			if (state.products.includes(productId)) {
				state.products.unshift(productId)
				state.products.pop()
			}
		},
		removeComparisonProduct: (state, action: PayloadAction<number>) => {
			const productId = action.payload
			const index = state.products.indexOf(productId)
			if (index !== -1) {
				state.products.splice(index, 1)
			}
		}
	}
})

export const { addComparisonProduct, removeComparisonProduct } =
	comparisonData.actions

export default comparisonData.reducer
