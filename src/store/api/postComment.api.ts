import { getAuthToken } from '@/services/getAuthToken'
import { IComment, IProduct, IResponse } from '@/types/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const postComment = createAsyncThunk<object, IComment>(
// 	'comment/postComment',
// 	async (data) => {
// 		const response = await axios.post(`http://localhost:1337/api/comments`, {
// 			headers: getAuthToken(),
// 			body: data
// 		})
// 		return response.data
// 	}
// )

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
						data
					}
				}
			}
		})
	})
})

export const { usePostCommentMutation } = postCommentApi
