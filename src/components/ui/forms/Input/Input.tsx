'use client'
import { UseFormRegister } from 'react-hook-form'
import './Input.scss'

import { ChangeEvent, FC } from 'react'
import { register } from 'module'

export interface IInputProps {
	type: 'text' | 'number' | 'email' | 'password'
	label?: string
	value?: string | number
	name?: string
	placeholder?: string
	error: string
	register?: UseFormRegister<any>
	required?: string | boolean
	disabled?: boolean
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	inputClassName?: string
}

const Input: FC<IInputProps> = ({
	type,
	label,
	value,
	name,
	placeholder,
	error,
	disabled,
	onChange,
	inputClassName,
	register,
	required
}) => {
	return (
		<label className={`${inputClassName ? inputClassName : ''} input`}>
			{label && <p className='input__title'>{label}</p>}
			<input
				className='input__input'
				type={type}
				id={label}
				value={value}
				// name={name}
				// placeholder={placeholder}
				// onChange={onChange}
				// disabled={disabled}
				// {...register(label, { required })}
			/>
			{error && <p className='input__error'>{error}</p>}
		</label>
	)
}

export default Input
