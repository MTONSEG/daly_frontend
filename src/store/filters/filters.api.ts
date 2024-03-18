import { IFilter, IResponse } from '@/types/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '@/services/axios.config'

export const fetchAllFilters = createAsyncThunk<
	IFilter[],
	string | string[],
	{ rejectValue: string }
>(
	'filtersData/fetchAllFilters',
	async (locale, { rejectWithValue }) => {
		try {
			const savedFilters = localStorage.getItem('filters')

			if (savedFilters) {
				return JSON.parse(savedFilters)
			}

			const data = await getData<IResponse<IFilter[]>>(
				`filters?locale=${locale}&populate[0]=options&populate[1]=categories.category&populate[2]=brands.brand`
			)

			localStorage.setItem('filters', JSON.stringify(data.data))

			return data.data
		} catch (error: any) {
			console.error('Error getting all product data:', error)
			return rejectWithValue(error)
		}
	}
)
