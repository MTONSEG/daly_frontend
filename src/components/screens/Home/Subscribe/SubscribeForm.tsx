import '../Home.scss'
import { useForm } from 'react-hook-form'
import { ISubscribe } from '@/types/types'
import { useState, useEffect } from 'react'
import { subscribeApi } from '@/store/api/subscribe.api'
import Checkbox from '@/components/ui/checkboxes/Checkbox'
import Input from '@/components/ui/forms/Input/Input'
import { useTranslations } from 'next-intl'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SubscribeForm = () => {
	//useForm-------------------------------------------------
	const form = useForm<ISubscribe>({})
	const { register, handleSubmit, formState, reset, watch } = form
	const { errors } = formState

	const onSubmit = handleSubmit(subscribeApi(reset))

	const [choosed, setChoosed] = useState<boolean>(false)

	useEffect(() => {
		if (formState.isDirty === false) {
			setChoosed(false)
		}
	}, [formState.isDirty])

	//---------------------------------------------------
	const word = useTranslations('subscribe')

	//validation-----------------------------------------
	const [formData, setFormData] = useState({
		subscriber: '',
		subscribe: false
	})

	const [error, setError] = useState<boolean>(false)

	const [checkboxError, setCheckboxError] = useState<boolean>(false)
	const validationErrors = () => {
		if (!choosed) {
			setError(true)
			setCheckboxError(true)
		} else {
			setCheckboxError(false)
			setError(false)
			setChoosed(false)
		}
	}

	useEffect(() => {
		form.setValue('data.subscriber', formData.subscriber)
		form.setValue('data.subscribe', formData.subscribe)
	}, [formData.subscriber])

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			setFormData({
				subscriber: '',
				subscribe: false
			})
		}
	}, [formState.isSubmitSuccessful])

	const selected = watch("data.subscribe")
	console.log(selected)
	return (
		<form onSubmit={onSubmit} className='subscribe-form'>
			<div className='subscribe-form__inputs'>
				{errors?.data?.subscriber && <span style={{ color: 'red' }}>Email обязателен</span>}
				<Input
				    type='email'
					placeholder={word('placeholder')}
					{...register('data.subscriber', { required: true })}
				/>
				<div className='subscribe-form__terms'>
					{/* {errors?.data?.subscribe && (
						<span style={{ color: 'red' }}>
							Отметьте если Вы согласны с обработкой персональных данных
						</span>
					)} */}
					<Checkbox
					type='checkbox'
					value={true}
					   	label=''
						isActive={choosed}
					    toggleCheckbox={() => setChoosed(!choosed)}
					    //name='data.subscribe'
						{...register('data.subscribe',{ required: true } )}
					/>
					<div className='subscribe-form__terms-text'>
						{word('agreement-text1')} <span>{word('agreement-text2')}</span>,{' '}
						{word('agreement-text3')} <span>{word('agreement-text4')}</span>
						{errors?.data?.subscribe && <div style={{color: "#e74c3c", marginTop: "16px"}}>Пдтвердите, что Вы согласны с условием !</div>}
					</div>
					
				</div>
			</div>
			<div>
				<button
					className='subscribe-form__button'
					type='submit'
					// onClick={() => {
					// 	validationErrors()
					// }}
				>
					{word('button-value')}
				</button>
			</div>
			<ToastContainer />
		</form>
	)
}

export default SubscribeForm
