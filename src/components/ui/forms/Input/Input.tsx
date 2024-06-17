'use client'
import './Input.scss'
import { ChangeEvent } from 'react'
import { forwardRef } from 'react'
import { PatternFormat } from 'react-number-format'
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
	onTelChange?: (value: string)=> void
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
	({ type, label, value, name, placeholder, error, disabled, onChange, inputClassName, onTelChange }, ref) => {
		return (
			<label className={`${inputClassName ? inputClassName : ''} input`}>
				{label && <p className='input__title'>{label}</p>}
				{type === 'number' && onTelChange ? (
					<PatternFormat
						type='tel'
						displayType='input'
						format='+380 | ## ### ####'
						valueIsNumericString
						allowEmptyFormatting
						mask='_'
						className='input__input'
						onValueChange={(values) => {
							onTelChange(values.value)
						}}
					></PatternFormat>
				) : (
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
				)}
				{error && <p className='input__error'>{error}</p>}
			</label>
		)
	}
)

Input.displayName="Input"
export default Input
