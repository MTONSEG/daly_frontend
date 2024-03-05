'use client'

import { appendCurrency } from '@/utils/appendCurrency'
import Image from 'next/image'
import { HTMLAttributes } from 'react'

interface PropsType extends HTMLAttributes<HTMLLIElement> {
	title: string
	price: number
	imageSrc: string
}

export default function PopupHeaderItem({
	title,
	price,
	imageSrc,
	...props
}: PropsType) {
	return (
		<li className='popup-header__item' {...props}>
			<div className='popup-header__item-img-wrap'>
				<Image src={imageSrc} width={57} height={80} alt={title} className='popup-header__item-img' />
			</div>

			<div className='popup-header__item-info'>
				<p className='popup-header__item-title'>{title}</p>
				<p className='popup-header__item-price'>{appendCurrency(price)}</p>
			</div>
		</li>
	)
}
