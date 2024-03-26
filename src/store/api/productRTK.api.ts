import { getAuthToken } from '@/services/getAuthToken'
import { IProduct, IResponse } from '@/types/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProduct = createAsyncThunk<
	IResponse<IProduct>,
	{ locale: 'ru' | 'en'; id: number }
>('products/getProductById', async (paramObj) => {
	const { locale, id } = paramObj

	const response = await axios.get(`http://localhost:1337/api/products/${id}?locale=${locale}`, {
		headers: getAuthToken()
	})
	return response.data
})
