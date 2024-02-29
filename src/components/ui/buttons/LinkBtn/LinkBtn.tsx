'use client'

import { ReactNode } from 'react'
import './LinkBtn.scss'
import Link, { LinkProps } from 'next/link'
import { usePathname} from '@/navigation'
import { useParams } from 'next/navigation'



interface PropsType extends LinkProps {
	variant?: 'default' | 'green'
	icon?: ReactNode
	text?: string
	href: string
	className?: string
}

export default function LinkBtn({
	icon,
	text,
	href,
	variant = 'default',
	className = '',
	...props
}: PropsType) {
	const path = usePathname()
	const {locale} = useParams()

	console.log(path, locale)
	

	return (
		<Link
			href={`/${locale}/${href}`}
			className={`${className} link-btn link-btn_${variant}`}
			{...props}
		>
			{icon && icon}
			{text && text}
		</Link>
	)
}
