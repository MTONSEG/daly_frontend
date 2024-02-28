'use client'

import { ReactNode } from 'react'
import './LinkBtn.scss'
import Link, { LinkProps } from 'next/link'

interface PropsType extends LinkProps {
	icon?: ReactNode
	text?: string
	href: string
}

export default function LinkBtn({ icon, text, href, ...props }: PropsType) {
	return (
		<Link href={href} className='link-btn' {...props}>
			{icon && icon}
			{text && text}
		</Link>
	)
}
