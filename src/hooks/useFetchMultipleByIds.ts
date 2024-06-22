import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct, IResponse } from '@/types/types'

// Define the API service
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://daly-backend-9vv0.onrender.com/api/' }),
    endpoints: (builder) => ({
        fetchProductsByIds: builder.query<IProduct[], { ids: number[]; locale: string | string[] }>({
            query: ({ ids, locale }) => {
                // console.log(ids)
                const queryString = ids.map((id) => `filters[id][$in][]=${id}`).join('&')
                return `products?${queryString}&locale=${locale}&populate=images,properties,category,brand,product_comments&populate[2]=localizations.images,localizations.properties,localizations.category,localizations.brand,localizations.product_comments`
            },
            transformResponse: (response: IResponse<IProduct[]>): IProduct[] => response.data,
            // Add onQueryStarted lifecycle event
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log('Response:', data)
                } catch (error) {
                    console.error('Error fetching products:', error)
                }
            }
        })
    })
})

// Export hooks for usage in functional components
export const { useFetchProductsByIdsQuery } = productsApi
