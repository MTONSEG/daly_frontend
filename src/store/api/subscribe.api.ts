// import { IResponse } from './../../types/types';
// import { ISubscribe } from './../../types/types';
// import { getAuthToken } from '@/services/getAuthToken';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const subscribeApi = createApi({
//     reducerPath: 'subscribeApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:1337/api/',
//         headers: getAuthToken(),
//         method: 'POST',
//     }),
//     endpoints: (builder) => ({
//         postSubscribe: builder.mutation<IResponse<ISubscribe>, ISubscribe>({
//             query: (formData) => ({
//                 url: 'home?subscribe=true',
//                 method: 'POST',
//                 body: formData,
//             }),
//         }),
//     }),
// });

// export const {usePostSubscribeMutation} = subscribeApi;
import axios from 'axios'
import { ISubscribe } from '@/types/types'

export const subscribeApi = () => {
	//submit-data-------------------------------------------
	const onSubmit = async (data: ISubscribe) => {
		const fetchUser = data
console.log(fetchUser)
		try {
			const response = await axios.post<ISubscribe>(
				'http://localhost:1337/api/subscribes',
				fetchUser
			)
			if (response.status === 200) {
				alert('ok')
			}
			return response
		} catch (error: any) {
			console.log(error, 'data post is failed')
		}
	}
	return onSubmit
}
