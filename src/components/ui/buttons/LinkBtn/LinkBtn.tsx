'use client'

import { ReactNode } from 'react'
import './LinkBtn.scss'
import Link, { LinkProps } from 'next/link'
import { useParams } from 'next/navigation'

interface PropsType extends LinkProps {
	variant?: 'default' | 'green'
	children?: ReactNode | string
	text?: string
	href: string 
	//children?: React.ReactNode
	className?: string
}

export default function LinkBtn({
	children,
	href,
	variant = 'default',
	className = '',
	...props
}: PropsType) {
	const { locale } = useParams()

	return (
		<Link
			href={`/${locale}/${href}`}
			className={`${className} link-btn link-btn_${variant}`}
			{...props}
		>
			{children && children}
		</Link>
	)
}
