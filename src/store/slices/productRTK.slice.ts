import { createSlice } from '@reduxjs/toolkit'
import { getProduct } from '../api/productRTK.api'
import { IProduct } from '@/types/types'

interface IInitSlice {
	isLoading: boolean
	product?: IProduct
}

const initialState: IInitSlice = {
	isLoading: false
}

const productSlice = createSlice({
	name: 'product',
	initialState: initialState,
	reducers: {
		addFetchedData: (state, action) => {
			state.product = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getProduct.fulfilled, (state, action) => {
			state.product = action.payload.data
		})
	}
})

export const { addFetchedData } = productSlice.actions
export default productSlice.reducer
