import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { apiKey, apiUrl } from '@/services/novaPostApiKey'

export const novaPostAdressesApi = createApi({
	reducerPath: 'novaPostAdressesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: apiUrl
	}),
	endpoints: (builder) => ({
		getAdresses: builder.query<object, { city: string }>({
			query: ({ city }) => {
				return {
					method: 'GET',
					url: '',
					body: JSON.stringify({
						apiKey: apiKey,
						modelName: 'Address',
						calledMethod: 'getWarehouses',
						methodProperties: {
							Limit: 50,
							city: city
						}
					})
				}
			}
		})
	})
})

export const { getAdresses } = novaPostAdressesApi
