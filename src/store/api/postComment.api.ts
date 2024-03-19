import { getAuthToken } from '@/services/getAuthToken'
import { IComment } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postCommentApi = createApi({
	reducerPath: 'commentReducerApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:1337/api/',
		headers: getAuthToken()
	}),
	endpoints: (builder) => ({
		postComment: builder.mutation<unknown, IComment>({
			query: (data) => {
				return {
					url: 'product-comments',
					method: 'POST',
					body: {
						data: data
					}
				}
			}
		})
	})
})

export const { usePostCommentMutation } = postCommentApi
