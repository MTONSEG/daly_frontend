import { createAsyncThunk } from '@reduxjs/toolkit'
import { postData } from '@/services/axios.config'
import { StrapiOrder } from '@/components/screens/Order/OrderSender/OrderSender'

export const createOrder = createAsyncThunk<any, StrapiOrder, { rejectValue: string }>(
	'filtersData/fetchAllFilters',
	async (data, thunkAPI) => {
		console.log("date:"+data.deliveryData);
		const orderData = {
			data
		}
		try {
			const response = await postData(`/orders`, orderData)
			console.log(response)
			return response
		} catch (error) {
			console.error('Error getting all product data:', error)
			return thunkAPI.rejectWithValue('Failed to fetch filters data')
		}
	}
)
