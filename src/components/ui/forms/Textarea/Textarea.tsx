import { ChangeEvent, FC, useRef } from 'react'
import './Textarea.scss'
import useAutosizeTextArea from '@/hooks/useAutoRisizeTextarea'

export interface ITextareaProps {
	label?: string
	value: string | number
	name: string
	placeholder?: string
	error: string
	disabled?: boolean
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
	textareaClassName?: string
}

const Textarea: FC<ITextareaProps> = ({
	label,
	value,
	name,
	placeholder,
	error,
	disabled,
	onChange,
	textareaClassName
}) => {
	const textareaRef = useRef(null)

	useAutosizeTextArea(textareaRef.current, value)

	return (
		<label className={`${textareaClassName ? textareaClassName : ''} textarea`}>
			{label && <p className='textarea__title'>{label}</p>}
			<textarea
				ref={textareaRef}
				className='textarea__textarea'
				id={label}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
			/>
			{error && <p className='textarea__error'>{error}</p>}
		</label>
	)
}

export default Textarea
