import '../Home.scss'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { ISubscribe } from '@/types/types'
import { useEffect } from 'react'
import { subscribeApi } from '@/store/api/subscribe.api'


const SubscribeForm = () => {
//useForm-------------------------------------------------
const form = useForm<ISubscribe>({})
const { register, handleSubmit, formState, reset } = form
const { errors } = formState

useEffect(() => {
	reset()
}, [])
	return (
			<form onSubmit={handleSubmit(subscribeApi())}>
				<TextField
					id='standard-basic'
					placeholder='Ваш e-mail'
					variant='standard'
					style={{ minWidth: '100%'}}
					type='text'
					{...register('data.subscriber', {
						required: 'Email is required'
					})}
					error={!!errors.data?.subscriber}
					helperText={errors.data?.subscriber?.message}
				/>

				<button type='submit'>click</button>
			</form>
)
}

export default SubscribeForm
