'use client'

import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import { IProduct } from '@/types/types'
import { useMemo, type HTMLAttributes, type ReactNode } from 'react'
import { CATALOG_PATH } from '@/routes/routes'
import { useState } from 'react'

interface PropsType extends HTMLAttributes<HTMLLIElement> {
	children: ReactNode | string
	products: IProduct[]
	href: string
}

export default function PopupCatalogItem({ children, products, href, ...props }: PropsType) {
	const productList = useMemo(() => {
		const list: IProduct[] = products.length > 20 ? products.slice(0, 20) : products

		return list.map((el, index) => (
			<LinkBtn href={`/product/${el.id}`} className='popup-catalog__item-link' key={index}>
				{el.attributes.title}
			</LinkBtn>
		))
	}, [products])

	return (
		<li {...props} className={`popup-catalog__item`}>
			<LinkBtn href={`/${CATALOG_PATH}`} className='popup-catalog__item-link'>
				{children}
			</LinkBtn>

			<div className={`popup-catalog__sub-list`}>{productList}</div>
		</li>
	)
}
