import { getAuthToken } from '@/services/getAuthToken'
import { ICategory, IResponse } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const catalogHeaderApi = createApi({
	reducerPath: 'catalogHeaderApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:1337/api/',
		headers: getAuthToken()
	}),
	endpoints: (builder) => ({
		getCategories: builder.query<IResponse<ICategory[]>, string>({
			query: (locale) =>
				`categories?sort[0]=name:asc&populate[0]=products&locale=${locale}&filters[name][$notContains]=mens`
		}),
		// searchProducts: builder.query<IResponse<>>
	})
})

export const { useGetCategoriesQuery } = catalogHeaderApi
