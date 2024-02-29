'use client'

import { ReactNode } from 'react'
import './PopupHeader.scss'

interface PropsType {
	children: ReactNode
}

export default function PopupHeader(props: PropsType) {
	return <div className='popup-header'>{props.children}</div>
}
