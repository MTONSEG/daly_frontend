import { getAuthToken } from '@/services/getAuthToken'
import { IProduct, IResponse } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const getProductApi = createApi({
	reducerPath: 'productReducerApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:1337/api/',
		headers: getAuthToken()
	}),
	endpoints: (builder) => ({
		getProduct: builder.query<IResponse<IProduct>, { locale: string; id: number }>({
			query: ({ locale, id }) => {
				return `products/${id}?locale=${locale}&populate=images,properties,product_comments`
			}
		}),
		getProducts: builder.query<IResponse<IProduct[]>, { locale: string; page: number }>({
			query: ({ locale, page }) => {
				return `http://localhost:1337/api/products?locale=${locale}&pagination[page]=${page}&pagination[pageSize]=4&populate=images`
			}
		})
	})
})

export const { useGetProductQuery, useGetProductsQuery } = getProductApi
