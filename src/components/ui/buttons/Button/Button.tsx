import { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.scss'

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'product' | 'parameter'
	className?: string
	children?: string | ReactNode
	type?: 'button' | 'submit' | 'reset'
}

export default function Button({ variant = 'default', className = '', children = "", type = 'button', ...props}: PropsType) {
	return <button type={type} className={`button ${className} button_${variant}`} {...props}>{children}</button>
}
