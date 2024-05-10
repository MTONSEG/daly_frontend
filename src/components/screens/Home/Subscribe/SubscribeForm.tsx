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
	const word = useTranslations('subscribe')

	//validation-----------------------------------------
	const [formData, setFormData] = useState({
		subscriber: '',
		subscribe: false
	})

	const [error, setError] = useState<string>('')
	const [error2, setError2] = useState<boolean>(false)
		
	const [checkboxError, setCheckboxError] = useState<boolean>(false)
	const validationErrors = () => {
		if (formData.subscriber === '') {
			setError('Email is required')
		}
		if (!choosed) {
			setError2(true);
			setCheckboxError(true)
		} else {
			setCheckboxError(false)
			setError('')
			setError2(false);
			setChoosed(false)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value
		})
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

	return (
		<form onSubmit={onSubmit} className='subscribe-form'>
			<div className='subscribe-form__inputs'>
				<Input
					type='email'
					placeholder={word('placeholder')}
					onChange={handleChange}
					name='subscriber'
					error={error}
					value={formData.subscriber}
				/>
				<div className='subscribe-form__terms'>
					<Checkbox
						label=''
						isActive={choosed}
						toggleCheckbox={() => setChoosed(!choosed)}
						name='subscribe'
						/>
						<div className='subscribe-form__terms-text'>
						{word('agreement-text1')} <span>{word('agreement-text2')}</span>,{' '}
						{word('agreement-text3')} <span>{word('agreement-text4')}</span>
					</div>
					{error2 && <div style={{color: "#e74c3c"}}>Пдтвердите, что Вы согласны с условием !</div>}
				</div>
			</div>
			<div>
				<button
					className='subscribe-form__button'
					type='submit'
					onClick={() => {
						validationErrors()
					}}
				>
					{word('button-value')}
				</button>
			</div>
			<ToastContainer />
		</form>
	)
}

export default SubscribeForm
