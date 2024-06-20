import { getAuthToken } from '@/services/getAuthToken'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IProduct } from '@/types/types'

interface IInitialProduct {
	data: IProduct | null
}

const initialState: IInitialProduct = {
	data: null
}

export const getProduct = createAsyncThunk<IProduct, number, { rejectValue: string }>(
	'getProduct',
	async (productId: number) => {
		const data = (
			await axios.get(`https://daly-backend-1.onrender.com/api/products/${productId}`, {
				headers: getAuthToken()
			})
		).data
		console.log(data)
		return data
	}
)

const productSlice = createSlice({
	name: 'product-Slice',
	initialState: initialState,
	reducers: {
		addProduct(state, action: PayloadAction<IProduct>) {
			state.data = action.payload
		}
	},
	extraReducers(builder) {
		builder.addCase(getProduct.fulfilled, (state, action) => {
			state.data = action.payload
		}),
			builder.addCase(getProduct.rejected, () => {
				console.log('error')
			})
	}
})

export default productSlice.reducer

export const { addProduct } = productSlice.actions
