'use client'

import { ReactNode } from 'react'
import './PopupHeader.scss'

interface PropsType {
	children: ReactNode
	variant?: 'compare' | 'cart' | 'favorite'
}

export default function PopupHeader(props: PropsType) {
	return (
		<div className={`popup-header popup-header_${props.variant}`}>
			{props.children}
		</div>
	)
}
