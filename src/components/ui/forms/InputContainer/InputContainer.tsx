import { FC } from 'react'
import Input from '../Input/Input'
import { IInputProps } from '../Input/Input'
import './InputContainer.scss'

interface IInputContainerProps extends IInputProps {
	inputClassName?: string
	containerClassName?: string
}

const InputContainer: FC<IInputContainerProps> = ({
	type,
	label,
	value,
	name,
	placeholder,
	error,
	disabled,
	onChange,
	inputClassName,
	containerClassName
}) => {
	return (
		<div
			className={`${
				containerClassName ? containerClassName : ''
			} input__wrapper`}
		>
			<Input
				label={label}
				type={type}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
				error={error}
				inputClassName={inputClassName}
			></Input>
		</div>
	)
}

export default InputContainer
