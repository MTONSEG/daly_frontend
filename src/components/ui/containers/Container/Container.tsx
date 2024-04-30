import { ReactNode } from 'react'
import './Container.scss'

interface PropsType {
	variant?: 'default' | 'fullscreen' | 'product' | 'block'
	children: ReactNode
}

export default function Container({ variant = 'default', children }: PropsType) {
	return <div className={`container container_${variant}`}>{children}</div>
}
