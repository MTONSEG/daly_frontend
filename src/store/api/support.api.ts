import axios from 'axios'
import { ISuport } from '@/types/types'
import { toast } from 'react-toastify'

export const suportApi = () => {
	const onSubmit = async (data: ISuport) => {
		const fetchUser = data
		console.log(fetchUser.data.image)
		const screenImage = new FormData()
		screenImage.append('files', fetchUser.data.image)
		
		const responseImage = await axios.post('http://localhost:1337/api/upload', screenImage)
		console.log(responseImage)
		const imageResponse = responseImage.data[0].id
		const requestData = {
           data: {
			name: fetchUser.data.name,
			phone: fetchUser.data.phone,
			email: fetchUser.data.email,
			message: fetchUser.data.message,
			image: imageResponse
		   }
		}
		// try {
		// 	const response = await axios.post<ISuport>(
		// 		'http://localhost:1337/api/support-requests',
		// 		requestData
		// 	)
		// 	if (response.status === 200) {
		// 		toast('Спасибо за подписку !')
		// 		// resetForm()
		// 	}
		// 	return response
		// } catch (error) {
		// 	console.log(error, 'Data post is failed')
		// }
	}
	return onSubmit
}
