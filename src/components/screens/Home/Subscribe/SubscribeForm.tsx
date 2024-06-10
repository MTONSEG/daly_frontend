
import './Subscribe.scss'
import { useForm } from 'react-hook-form'
import { ISubscribe } from '@/types/types'
import { useState, useEffect } from 'react'
import { subscribeApi } from '@/store/api/subscribe.api'
import Input from '@/components/ui/forms/Input/Input'
import { useTranslations } from 'next-intl'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CheckIcon } from '@/components/ui/icons'

const SubscribeForm = () => {
	//useForm-------------------------------------------------
	const form = useForm<ISubscribe>({
		defaultValues: {
			data: {
				subscriber: '',
				subscribe: false
			}
		}
	})

	const { register, handleSubmit, formState, reset } = form
	const { errors } = formState

	const onSubmit = handleSubmit(subscribeApi(reset))

	//---------------------------------------------------
	const word = useTranslations('subscribe')
    //validation-----------------------------------------
	const [formData, setFormData] = useState({
		subscriber: '',
		subscribe: false
	})
	
	useEffect(() => {
		form.setValue('data.subscriber', formData.subscriber)
		form.setValue('data.subscribe', formData.subscribe)
	}, [formData.subscriber, form, formData.subscribe])

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			setFormData({
				subscriber: '',
				subscribe: false
			})
			setActive(false)
		}
	}, [formState.isSubmitSuccessful])
	
	const [active, setActive] = useState<boolean>(false)
	
	return (
		<form onSubmit={onSubmit} className='subscribe-form'>
			<div className='subscribe-form__inputs'>
				{errors?.data?.subscriber && <span style={{ color: 'red' }}>{word("email")}</span>}
				<Input
					type='email'
					placeholder={word('placeholder')}
					{...register('data.subscriber', { required: true })}
				/>
				<div className='subscribe-form__terms'>
					<div
						className={`subscribe-form__check-box ${active && 'subscribe-form__check-box_active'}`}
						onClick={() => setActive(!active)}
					>
						<input
							type='checkbox'
							{...register('data.subscribe', { required: true })}
							className='subscribe-form__terms-input'
						/>
						{active && <CheckIcon className='subscribe-form__check-box-sign' />}
					</div>
					<div className='subscribe-form__terms-text'>
						{word('agreement-text1')} <span>{word('agreement-text2')}</span>,{' '}
						{word('agreement-text3')} <span>{word('agreement-text4')}</span>
						{errors?.data?.subscribe && (
							<div style={{ color: '#e74c3c', marginTop: '16px' }}>
								{word("confirmation")}
							</div>
						)}
					</div>
				</div>
			</div>
			<div>
				<button className='subscribe-form__button' type='submit'>
					{word('button-value')}
				</button>
			</div>
			<ToastContainer />
		</form>
	)
}

export default SubscribeForm
