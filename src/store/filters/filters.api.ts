import { IFilter, IResponse } from '@/types/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '@/services/axios.config'


export const fetchAllFilters = createAsyncThunk<
	IFilter[],
	string | string[],
	{ rejectValue: string }
>('filtersData/fetchAllFilters', async (locale, thunkAPI) => {
	try {
		const data = await getData<IResponse<IFilter[]>>(
			`filters?locale=${locale}&populate[0]=options&populate[1]=categories.category&populate[2]=brands.brand`
		)

		return data.data
	} catch (error) {
		console.error('Error getting all product data:', error)
		return thunkAPI.rejectWithValue('Failed to fetch filters data')
	}
})
