import axios, { AxiosError as ErrorAxios } from 'axios'

export class AxiosError extends ErrorAxios {}

// const auth = (token: string) => ({
// 	headers: {
// 		Authorization: `Bearer ${token}`
// 	}
// })

export const instanceAxios = axios.create({
	baseURL: 'http://localhost:1337/api'
})

// export const getData = async <T>(endpoint: string): Promise<T> => {

// 	const response = await instanceAxios.get<T>(endpoint, auth(token))

// 	return response.data
// }

// export const postData = async <T>(endpoint: string, body: T): Promise<void> => {

// 	await instanceAxios.post<T>(endpoint, body, auth(token))
// }

// export const postAuth = async <T>(
// 	endpoint: string,
// 	body: {
// 		email: FormDataEntryValue | null
// 		password: FormDataEntryValue | null
// 	}
// ): Promise<T> => {
// 	const response = await instanceAxios.post<T>(endpoint, body)

// 	return response.data
// }

// export const putData = async <T>(endpoint: string, body: T): Promise<T> => {

// 	const response = await instanceAxios.put<T>(endpoint, body, auth(token))

// 	return response.data
// }

// export const deleteData = async (endpoint: string): Promise<void> => {

// 	await instanceAxios.delete(endpoint, auth(token))
// }
