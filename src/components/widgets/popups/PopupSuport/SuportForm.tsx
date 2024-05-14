'use client'
import './PopupSuport.scss'
import { ISuport } from '@/types/types'
import Input from '@/components/ui/forms/Input/Input'
import { UseFormRegister } from 'react-hook-form'

interface PropsTypes {
	register: UseFormRegister<ISuport>
	errors?: {
		data?: {
			name?: { message: string }
			phone: { message: string }
			email: { message: string }
			message: { message: string }
		}
	}
}

const SuportForm = ({ register, errors }: PropsTypes) => {
	return (
		<div className='popup-suport__form'>
			<label htmlFor='name' className='popup-suport__form-label'>
				Как к Вам обращаться?{' '}
			</label>
			<Input
				id='name'
				type='text'
				placeholder={'Ф.И.О'}
				{...register('data.name', { required: true })}
				inputClassName='popup-suport__form-input'
			/>
			{errors?.data?.name && <p style={{ color: 'red', marginBottom: '24px' }}>Введите Ваше имя</p>}

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
			{errors?.data?.phone && (
				<p style={{ color: 'red', marginBottom: '24px' }}>Введите номер телефона</p>
			)}

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
			{errors?.data?.email && <p style={{ color: 'red', marginBottom: '24px' }}>Введите Email</p>}
			<label htmlFor='message' className='popup-suport__form-label'>
				Обращение{' '}
			</label>
			
			<Input
				id='message'
				type='text'
				placeholder={''}
				{...register('data.message', { required: true })}
				inputClassName='popup-suport__form-input'
			/>
			{errors?.data?.message && (
				<p style={{ color: 'red', marginBottom: '24px' }}>Введите текст обращения</p>
			)}
		</div>
	)
}

export default SuportForm
