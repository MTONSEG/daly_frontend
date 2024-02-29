'use client'
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs'
import { useParams, usePathname } from 'next/navigation'
// import useInput from '@/hooks/useInput'
// import { useTranslations } from 'next-intl'
import React from 'react'

interface IBreadcrumb {
	label: string
	href: string
	active?: boolean
}

const Product = () => {
	const currentPath = usePathname()
	// const params = useParams()
	// console.log(params)

	const breadcrumbArr: IBreadcrumb[] = [
		{ label: 'test', href: '/', active: false },
		{ label: 'test2', href: `${currentPath}`, active: true }
	]

	return (
		<div style={{ width: '100%' }}>
			<Breadcrumbs breadcrumbsArr={breadcrumbArr} />
		</div>
	)
}

export default Product
