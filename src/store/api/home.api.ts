import { IResponse } from './../../types/types'
import { getAuthToken } from '@/services/getAuthToken'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IBannerResponse {
	attributes: {
		hero_banners?: {
			id: number
			url: string
			banner: {
				data: {
					attributes: {
						url: string
					}
				}
			}
		}[]
		middle_banners?: {
			id: number
			url: string
			banner: {
				data: {
					attributes: {
						url: string
					}
				}
			}
		}[]
		bottom_bunners?: {
			id: number
			url: string
			banner: {
				data: {
					attributes: {
						url: string
					}
				}
			}
		}[]
	}
}

type bannerType = 'hero_banners' | 'middle_banners' | 'bottom_bunners'

export const homeApi = createApi({
	reducerPath: 'homeApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:1337/api/',
		headers: getAuthToken()
	}),
	endpoints: (builder) => ({
		getBanners: builder.query<IResponse<IBannerResponse>, { bannerType: bannerType }>({
			query: ({ bannerType }) => {
				return `home?populate[${bannerType}][populate][0]=banner`
			}
		})
	})
})

export const { useGetBannersQuery } = homeApi
