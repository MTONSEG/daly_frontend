import { IProduct, IResponse } from '@/types/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getData } from '@/services/axios.config'

export const fetchFilteredProducts = createAsyncThunk<
	IResponse<IProduct[]>,
	string,
	{ state: RootState }
>('catalogProducts/fetchFilteredProducts', async (url) => {
	try {
		const data = await getData<IResponse<IProduct[]>>(url)
		return data
	} catch (e: unknown) {
		// Handle errors here, such as logging or throwing a custom error
		if (typeof e === 'string') {
			console.error(e.toUpperCase())
		} else if (e instanceof Error) {
			console.error(e.message)
		}
		// Throw an error or return a default value as needed
		throw new Error('Failed to fetch filtered products')
	}
})
