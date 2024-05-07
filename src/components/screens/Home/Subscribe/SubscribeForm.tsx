import '../Home.scss'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { ISubscribe } from '@/types/types'
import { useState, useEffect } from 'react'
import { subscribeApi } from '@/store/api/subscribe.api'
import { useTranslations } from 'next-intl'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const SubscribeForm = () => {
	//useForm-------------------------------------------------
	const form = useForm<ISubscribe>({})
	const { register, handleSubmit, formState, reset } = form
	const { errors } = formState

	const onSubmit = handleSubmit(subscribeApi(reset))

	const [choosed, setChoosed] = useState<boolean>(false)

	useEffect(() => {
		if (formState.isDirty === false) {
			setChoosed(false)
		}
	}, [formState.isDirty])

	//---------------------------------------------------
	const word = useTranslations("subscribe")


	return (
		<form onSubmit={onSubmit} className='subscribe-form'>
			<div className='subscribe-form__inputs'>
				<TextField
					id='standard-basic'
					placeholder={word("placeholder")}
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
					>
						<div></div>
					</div>
					<div className='subscribe-form__terms-text'>
						{word("agreement-text1")} <span>{word("agreement-text2")} </span>, {word("agreement-text3")}{' '}
						<span>{word("agreement-text4")}</span>
					</div>
				</div>
			</div>
			<div>
				<button className='subscribe-form__button' type='submit'>
				{word("button-value")}
				</button>
			</div>
			<ToastContainer />
		</form>
	)
}

export default SubscribeForm
