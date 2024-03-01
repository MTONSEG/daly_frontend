'use client'
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs'
import SliderThumbNail from '@/components/widgets/SliderThumbnail/SliderThumbnail'
import axios from 'axios'
import { usePathname } from 'next/navigation'
// import useInput from '@/hooks/useInput'
// import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

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

	useEffect(() => {}, [])

	return (
		<div style={{ width: '100%' }}>
			<Breadcrumbs breadcrumbsArr={breadcrumbArr} />
			<SliderThumbNail />
		</div>
	)
}

export default Product
