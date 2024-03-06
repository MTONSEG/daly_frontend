import { ButtonHTMLAttributes } from 'react'
import './Button.scss'

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'product'
	className?: string
}

export default function Button({ variant = 'default', className = '', ...props }: PropsType) {
	return <button className={`button ${className} button_${variant}`} {...props}></button>
}
