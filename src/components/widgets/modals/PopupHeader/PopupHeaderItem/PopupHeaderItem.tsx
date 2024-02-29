'use client'

import { appendCurrency } from '@/utils/appendCurrency'
import Image from 'next/image'

interface PropsType {
	title: string
	price: number
	imageSrc: string
}

export default function PopupHeaderItem({ title, price, imageSrc }: PropsType) {
	return (
		<div className='popup-header__item'>
			<div className='popup-header__item-img-wrap'>
				<Image src={imageSrc} width={57} height={80} alt={title} />
			</div>

			<div className='popup-header__item-info'>
				<p className='popup-header__item-title'>{title}</p>
				<p className='popup-header__item-price'>{appendCurrency(price)}</p>
			</div>
		</div>
	)
}
