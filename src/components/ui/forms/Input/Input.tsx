'use client'
import './Input.scss'

import { ChangeEvent, FC } from 'react'

export interface IInputProps {
	type: 'text' | 'number' | 'email' | 'password'
	label?: string
	value: string | number
	name: string
	placeholder?: string
	error: string
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
	inputClassName
}) => {
	return (
		<label className={`${inputClassName ? inputClassName : ''} input`}>
			<p className='input__title'>{label}</p>
			<input
				className='input__input'
				type={type}
				id={label}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
			/>
			{error && <p className='input__error'>{error}</p>}
		</label>
	)
}

export default Input
