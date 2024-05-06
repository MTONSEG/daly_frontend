import '../Home.scss'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { ISubscribe } from '@/types/types'
import { useEffect, useState } from 'react'
import { subscribeApi } from '@/store/api/subscribe.api'
import Button from '@/components/ui/buttons/Button/Button'

const SubscribeForm = () => {
	//useForm-------------------------------------------------
	const form = useForm<ISubscribe>({})
	const { register, handleSubmit, formState, reset } = form
	const { errors } = formState

	useEffect(() => {
		reset()
	}, [])

	const [choosed, setChoosed] = useState<boolean>(false)

	return (
		<form onSubmit={handleSubmit(subscribeApi())} className='subscribe-form'>
			<div className='subscribe-form__inputs'>
				<TextField
					id='standard-basic'
					placeholder='Ваш e-mail'
					variant='outlined'
					style={{ minWidth: '100%' }}
					type='text'
					{...register('data.subscriber', {
						required: 'Email is required'
					})}
					error={!!errors.data?.subscriber}
					helperText={errors.data?.subscriber?.message}
				/>
				<div className='subscribe-form__terms'>
					<div
						className={
							choosed ? 'subscribe-form__terms-mark-active' : 'subscribe-form__terms-mark-nonactive'
						}
						onClick={() => setChoosed(!choosed)}
					><div></div></div>
					<div className='subscribe-form__terms-text'>
						Я согласен с условиями обработки <span>персональных данных</span>, а также с{' '}
						<span>условиями подписки</span>
					</div>
				</div>
			</div>
			<div>
			<button className='subscribe-form__button'>Подписаться</button>
			</div>
		</form>
	)
}

export default SubscribeForm
