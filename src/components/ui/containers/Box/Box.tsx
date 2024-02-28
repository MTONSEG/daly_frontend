import type { ReactNode } from 'react'
import './Box.scss'

interface PropsType {
	variant?: 'default' | 'fullscreen'
	children: ReactNode
}

export default function Box({ variant = 'default', children }: PropsType) {
	return <div className={`box box_${variant}`}>{children}</div>
}
