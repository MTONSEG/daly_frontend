import { createSlice } from '@reduxjs/toolkit'
import { getProductApi } from '../api/productRTKQ.api'
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
		builder.addMatcher(getProductApi.endpoints.getProduct.matchFulfilled, (state, action) => {
			state.product = action.payload.data
		})
	}
})

export const { addFetchedData } = productSlice.actions
export default productSlice.reducer
