import { AxiosError, getData } from '@/services/axios.config'
import { getAuthToken } from '@/services/getAuthToken'
import type { ICategory, IProduct, IResponse } from '@/types/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const catalogHeaderApi = createApi({
	reducerPath: 'catalogHeaderApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://daly-backend-1.onrender.com/api/',
		headers: getAuthToken()
	}),
	endpoints: (builder) => ({
		getCategories: builder.query<IResponse<ICategory[]>, string>({
			query: (locale) =>
				`categories?sort[0]=name:asc&populate[0]=products&locale=${locale}&filters[name][$notContains]=mens`
		})
	})
})

export const { useGetCategoriesQuery } = catalogHeaderApi

export const searchProduct = createAsyncThunk<
	IProduct[] | undefined,
	{ title: string; locale: string },
	{ rejectValue: string }
>('api/searchProduct', async ({ title, locale }) => {
	try {
		const response = await getData<IResponse<IProduct[]>>(
			`products?filters[title][$containsi]=${title}&locale=${locale}`
		)

		return response.data
	} catch (error) {
		if (error instanceof AxiosError) {
			console.log(error.message)
		}
	}
})
