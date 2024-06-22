import { getAuthToken } from '@/services/getAuthToken'
import axios, { AxiosError as ErrorAxios } from 'axios'

export class AxiosError extends ErrorAxios {}

const auth = {
	headers: getAuthToken()
}

export const instanceAxios = axios.create({
	baseURL: 'https://dalybackend-production.up.railway.app/api'
})

export const getData = async <T>(endpoint: string): Promise<T> => {
	const response = await instanceAxios.get<T>(endpoint, auth)

	return response.data
}

export const postData = async <T>(endpoint: string, body: T): Promise<void> => {
	await instanceAxios.post<T>(endpoint, body, auth)
}

export const putData = async <T>(endpoint: string, body: T): Promise<T> => {
	const response = await instanceAxios.put<T>(endpoint, body, auth)

	return response.data
}

export const deleteData = async (endpoint: string): Promise<void> => {
	await instanceAxios.delete(endpoint, auth)
}

