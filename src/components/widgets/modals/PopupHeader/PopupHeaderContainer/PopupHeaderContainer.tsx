'use client'

import { TriangleIcon } from '@/components/ui/icons'
import { ReactNode } from 'react'

interface PropsType {
	children: ReactNode
}

export default function PopupHeaderContainer(props: PropsType) {
	return (
		<div className='popup-header__container'>
			<TriangleIcon className='popup-header__triangle' />

			{props.children}
		</div>
	)
}
