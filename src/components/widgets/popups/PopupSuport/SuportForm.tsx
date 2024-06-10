'use client'
import './PopupSuport.scss'
import { ISuport } from '@/types/types'
import Input from '@/components/ui/forms/Input/Input'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { useTranslations } from 'next-intl'

interface PropsTypes {
	register: UseFormRegister<ISuport>
	errors?: FieldErrors<ISuport>
}

const SuportForm = ({ register, errors }: PropsTypes) => {
	const word = useTranslations('popup-support-form')
	return (
		<div className='popup-suport__form'>
			<label htmlFor='name' className='popup-suport__form-label'>
				{word('ask')}{' '}
			</label>
			<Input
				id='name'
				type='text'
				placeholder={word("placeholderName")}
				{...register('data.name', { required: true })}
				inputClassName='popup-suport__form-input'
			/>
			{errors?.data?.name && <p style={{ color: 'red', marginBottom: '24px' }}>{word('name')}</p>}

			<label htmlFor='phone' className='popup-suport__form-label'>
				{word('phoneAccount')}{' '}
			</label>
			<Input
				id='phone'
				type='number'
				placeholder={word("placeholderPhone")}
				{...register('data.phone', { required: true })}
				inputClassName='popup-suport__form-input'
			/>
			{errors?.data?.phone && <p style={{ color: 'red', marginBottom: '24px' }}>{word('phone')}</p>}

			<label htmlFor='full' className='popup-suport__form-label'>
				{word('emailResponse')}{' '}
			</label>
			<Input
				id='email'
				type='email'
				placeholder={word("placeholderEmail")}
				{...register('data.email', { required: true })}
				inputClassName='popup-suport__form-input'
			/>
			{errors?.data?.email && <p style={{ color: 'red', marginBottom: '24px' }}>{word('email')}</p>}
			<label htmlFor='message' className='popup-suport__form-label'>
				{word('appeal')}{' '}
			</label>

			<Input
				id='message'
				type='text'
				placeholder={''}
				{...register('data.message', { required: true })}
				inputClassName='popup-suport__form-input'
			/>
			{errors?.data?.message && (
				<p style={{ color: 'red', marginBottom: '24px' }}>{word('textAppeal')}</p>
			)}
		</div>
	)
}

export default SuportForm
