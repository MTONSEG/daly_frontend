import { ButtonHTMLAttributes } from 'react'
import './Button.scss'

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'product' | 'parameter'
	className?: string
	children?: string;
}

export default function Button({ variant = 'default', className = '', children = "" , ...props}: PropsType) {
	return <button className={`button ${className} button_${variant}`} {...props}>{children}</button>
}
