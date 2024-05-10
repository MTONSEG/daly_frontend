import axios from 'axios'
import { ISubscribe } from '@/types/types'
import { toast } from 'react-toastify'

export const subscribeApi = (resetForm: () => void) => {
	const onSubmit = async (data: ISubscribe) => {
		const fetchUser = data
		console.log(fetchUser)
		
		if (fetchUser.data.subscriber !== "") {
			try {
				const response = await axios.post<ISubscribe>(
					'http://localhost:1337/api/subscribes',
					fetchUser
				)
				if (response.status === 200) {
					toast('Спасибо за подписку !')
					resetForm()
				}
				return response
			} catch (error) {
				console.log(error, 'Data post is failed')
			}
		} 
		
	}
	return onSubmit
}
