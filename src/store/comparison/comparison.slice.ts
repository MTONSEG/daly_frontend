import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IComparisonData {
	products: number[]
}

const initialState: IComparisonData = {
	products: []
}

const comparisonData = createSlice({
	name: 'comparisonData',
	initialState,
	reducers: {
		addComparisonProduct: (state, action: PayloadAction<number>) => {
			const productId = action.payload
			console.log(productId)
			if (!state.products.includes(productId)) {
				if (state.products.length >= 2) {
					state.products.pop() 
				}
				state.products.unshift(productId) 
			}
		},
		removeComparisonProduct: (state, action: PayloadAction<number>) => {
			const productId = action.payload;
			let index = state.products.indexOf(productId);
			while (index !== -1) {
				state.products.splice(index, 1);
				index = state.products.indexOf(productId);
			}
		}
				
		// removeComparisonProduct: (state, action: PayloadAction<number>) => {
		// 	const productId = action.payload
		// 	console.log(productId)
		// 	const index = state.products.indexOf(productId)
		// 	if (index !== -1) {
		// 		state.products.splice(index, 1)
		// 	}
		// }
	}
})

export const { addComparisonProduct, removeComparisonProduct } =
	comparisonData.actions

export default comparisonData.reducer
