import './Input.scss'

import { ChangeEvent, FC } from 'react'

interface IInputProps {
	type: 'text' | 'number' | 'email' | 'password'
	label?: string
	value: string | number
	name: string
	placeholder?: string
	error: string
	disabled?: boolean
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<IInputProps> = ({
	type,
	label,
	value,
	name,
	placeholder,
	error,
	disabled,
	onChange
}) => {
	return (
		<label className='input'>
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
