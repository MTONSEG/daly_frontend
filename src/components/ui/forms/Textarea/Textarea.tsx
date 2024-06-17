import { ChangeEvent, useRef, useState } from 'react'
import './Textarea.scss'
import useAutosizeTextArea from '@/hooks/useAutoRisizeTextarea'
import { forwardRef } from 'react'

export interface ITextareaProps {
	label?: string
	value?: string | number
	name?: string
	placeholder?: string
	error?: string
	disabled?: boolean
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
	textareaClassName?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
	(
		{ label, value, name, placeholder, error, disabled, onChange, textareaClassName },
		parentRef
	) => {
		const textareaRef = useRef<HTMLTextAreaElement | null>(null)

		const [currValue, setCurrValue] = useState('')

		const parentRefCopy = parentRef as (instance: HTMLTextAreaElement | null) => void

		useAutosizeTextArea(textareaRef.current, value ? value : currValue)

		return (
			<label className={`${textareaClassName ? textareaClassName : ''} textarea`}>
				{label && <p className='textarea__title'>{label}</p>}
				<textarea
					ref={(el) => {
						textareaRef.current = el

						if (parentRef) {
							parentRef as (instance: HTMLTextAreaElement | null) => void
							parentRefCopy(el)
						}
					}}
					className='textarea__textarea'
					id={label}
					value={value}
					name={name}
					placeholder={placeholder}
					onChange={(e) => {
						onChange && onChange(e)
						setCurrValue(e.target.value)
					}}
					disabled={disabled}
				/>
				{error && <p className='textarea__error'>{error}</p>}
			</label>
		)
	}
)

Textarea.displayName='Textarea'
export default Textarea
