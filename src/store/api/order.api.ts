import { createAsyncThunk } from '@reduxjs/toolkit'
import {  postData } from '@/services/axios.config'

export const createOrder = createAsyncThunk<
	any,
	[string | string[], any],
	{ rejectValue: string }
>('filtersData/fetchAllFilters', async ([locale, body], thunkAPI) => {
    const orderData = {
        data: body
    }
    console.log("tried");
	try {
		const response = await postData(
			`/orders`,
			orderData
		)
        console.log(response);
		return response
	} catch (error) {
		console.error('Error getting all product data:', error)
		return thunkAPI.rejectWithValue('Failed to fetch filters data')
	}
})
