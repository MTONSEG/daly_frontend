'use client'
import './PopupSuport.scss'
import { ISuport } from '@/types/types'
import { useForm } from 'react-hook-form'
import Input from '@/components/ui/forms/Input/Input'

const SuportForm = () => {
	//useForm-------------------------------------------------
	const form = useForm<ISuport>({})
	const { register, handleSubmit, formState, reset } = form
	const { errors } = formState

	//const onSubmit = handleSubmit()
	return (
		<form className='popup-suport__form'>
			<label htmlFor='fullname' className='popup-suport__form-label'>
				Как к Вам обращаться?{' '}
			</label>
			<Input
				id='fullname'
				type='email'
				placeholder={'Ф.И.О'}
				{...register('data.fullname', { required: true })}
				inputClassName='popup-suport__form-input'
			/>
			<label htmlFor='phone' className='popup-suport__form-label'>
				Номер телефона,который привязан к аккаунту{' '}
			</label>
			<Input
				id='phone'
				type='number'
				placeholder={'Номер телефона'}
				{...register('data.phone', { required: true })}
				inputClassName='popup-suport__form-input'
			/>
			<label htmlFor='full' className='popup-suport__form-label'>
				E- mail, на который мы вам ответим{' '}
			</label>
			<Input
				id='email'
				type='email'
				placeholder={'Email'}
				{...register('data.email', { required: true })}
				inputClassName='popup-suport__form-input'
			/>
			<label htmlFor='full' className='popup-suport__form-label'>
				Обращение{' '}
			</label>
			<Input
				id='text'
				type='text'
				placeholder={'Email'}
				{...register('data.text', { required: true })}
				inputClassName='popup-suport__form-input'
			/>
		</form>
	)
}

export default SuportForm
