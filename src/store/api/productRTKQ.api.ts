import { getAuthToken } from '@/services/getAuthToken'
import { IProduct, IResponse, ILogos, ITerms } from '@/types/types'
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
				return `http://localhost:1337/api/products?locale=${locale}&pagination[page]=${page}&pagination[pageSize]=7&populate=images`
			}
		}),
		getLogos: builder.query<ILogos, object>({
			query: () => 'home?populate=brandsLogo.data.attributes.url*'
		}),
		getTerms: builder.query<ITerms, { locale: string | string[] }>({
			query: ({ locale }) => `home?locale=${locale}&populate=terms.image.data.attributes.url*`
		}),

		getProductsByTag: builder.query<
			IResponse<Omit<IProduct[], 'brand'>>,
			{ tag: string; tagValue: boolean; pageNum?: number; sort?: string }
		>({
			query: ({ tag, tagValue, pageNum = 1, sort }) => {
				return `products?filters[${tag}][$eq]=${tagValue}&pagination[page]=${pageNum}&pagination[pageSize]=7&populate=images&${sort}`
			}
		})
	})
})

export const {
	useGetProductQuery,
	useGetProductsQuery,
	useGetLogosQuery,
	useGetTermsQuery,
	useGetProductsByTagQuery
} = getProductApi
