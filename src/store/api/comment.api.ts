import { getAuthToken } from '@/services/getAuthToken'
import { IComment } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ICommentResponse {
	data: {
		attributes: {
			product_comments: {
				data: {
					attributes: IComment
				}[]
			}
		}
		title: string
	}
}

export const commentApi = createApi({
	reducerPath: 'commentReducerApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://daly-backend-1.onrender.com/api/',
		headers: getAuthToken()
	}),
	endpoints: (builder) => ({
		getComments: builder.query<ICommentResponse, { id: number }>({
			query: ({ id }) => {
				return `products/${id}?fields[0]=title&populate=product_comments`
			}
		}),
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

export const { usePostCommentMutation, useGetCommentsQuery } = commentApi
