'use client'

import { ReactNode } from 'react'

interface PropsType {
	children: ReactNode
}

export default function Icon({ children }: PropsType) {
	return <>{children}</>
}
