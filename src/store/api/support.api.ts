import axios from 'axios'
import { ISuport } from '@/types/types'
import { toast } from 'react-toastify'

export const suportApi = (resetForm: () => void) => {
	const onSubmit = async (data: ISuport) => {
		const fetchUser = data
		const requestData: any = {
			data: {
				name: fetchUser.data.name,
				phone: fetchUser.data.phone,
				email: fetchUser.data.email,
				message: fetchUser.data.message,
			}
		}

		// Проверяем, было ли выбрано изображение
		if (fetchUser.data.image) {
			const screenImage = new FormData()
			screenImage.append('files', fetchUser.data.image)
			const responseImage = await axios.post('http://localhost:1337/api/upload', screenImage)
			const imageResponse = responseImage.data[0].id
			requestData.data.image = imageResponse
		}

		try {
			const response = await axios.post<ISuport>(
				'http://localhost:1337/api/support-requests',
				requestData
			)
			if (response.status === 200) {
				resetForm()
			}
			return response
		} catch (error) {
			toast.error("Что-то пошло не так !")
			console.log(error, 'Data post is failed')
		}
	}
	return onSubmit
}
