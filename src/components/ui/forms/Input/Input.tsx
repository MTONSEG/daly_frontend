'use client'
import './Input.scss'
import { ChangeEvent } from 'react'
import { forwardRef } from 'react'

export interface IInputProps {
	id?: string
	type?: 'text' | 'number' | 'email' | 'password'
	label?: string
	value?: string | number
	name?: string
	placeholder?: string
	error?: string 
	required?: string | boolean
	disabled?: boolean
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	inputClassName?: string
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
	({ type, label, value, name, placeholder, error, disabled, onChange, inputClassName }, ref) => {
		return (
			<label className={`${inputClassName ? inputClassName : ''} input`}>
				{label && <p className='input__title'>{label}</p>}
				<input
					ref={ref}
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
)

export default Input
