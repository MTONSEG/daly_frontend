'use client'

import { ReactNode } from 'react'
import './LinkBtn.scss'
import Link, { LinkProps } from 'next/link'

interface PropsType extends LinkProps {
	icon?: ReactNode
	text?: string
	href: string
	children?: React.ReactNode
}

export default function LinkBtn({
	icon,
	text,
	href,
	children,
	...props
}: PropsType) {
	return (
		<Link href={href} className='link-btn' {...props}>
			{children}
			{icon && icon}
			{text && text}
		</Link>
	)
}
