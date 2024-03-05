'use client'

import { HTMLAttributes, ReactNode } from 'react'
import './PopupHeader.scss'

interface PropsType extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	variant?: 'compare' | 'cart' | 'favorite'
}

export default function PopupHeader({
	children,
	variant = 'compare',
	...props
}: PropsType) {
	return (
		<div className={`popup-header popup-header_${variant}`} {...props}>
			{children}
		</div>
	)
}
