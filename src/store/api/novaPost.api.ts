import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey, apiUrl } from '@/services/novaPostApiKey'
import { IResponse } from '../../types/types'

export const novaPostAdressesApi = createApi({
	reducerPath: 'novaPostAdressesReducerApi',
	baseQuery: fetchBaseQuery({
		baseUrl: apiUrl
	}),
	endpoints: (builder) => ({
		getAdresses: builder.mutation<IResponse<{ DescriptionRu: string }[]>, { city: string }>({
			query: (city) => {
				return {
					method: 'POST',
					url: '',
					body: {
						apiKey: apiKey,
						modelName: 'Address',
						calledMethod: 'getWarehouses',
						methodProperties: {
							Limit: 50,
							city: city
						}
					}
				}
			}
		})
	})
})

export const { useGetAdressesMutation } = novaPostAdressesApi
