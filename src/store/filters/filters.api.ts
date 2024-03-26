import { IFilter, IResponse } from '@/types/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '@/services/axios.config'

const ONE_DAY_MS = 24 * 60 * 60 * 1000 // 1 day in milliseconds

export const fetchAllFilters = createAsyncThunk<
	IFilter[],
	string | string[],
	{ rejectValue: string }
>('filtersData/fetchAllFilters', async (locale) => {
	try {
		const savedFilters = localStorage.getItem('filters')
		const savedFiltersTimestamp = localStorage.getItem('filtersTimestamp')

		if (
			savedFilters &&
			savedFiltersTimestamp &&
			Date.now() - parseInt(savedFiltersTimestamp) < ONE_DAY_MS
		) {
			return JSON.parse(savedFilters)
		} else {
			const data = await getData<IResponse<IFilter[]>>(
				`filters?locale=${locale}&populate[0]=options&populate[1]=categories.category&populate[2]=brands.brand`
			)

			localStorage.setItem('filters', JSON.stringify(data.data))
			localStorage.setItem('filtersTimestamp', Date.now().toString())

			return data.data
		}
	} catch (error) {
		console.error('Error getting all product data:', error)
	}
})
