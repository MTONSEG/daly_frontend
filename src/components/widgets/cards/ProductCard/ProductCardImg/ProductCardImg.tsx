import React from 'react'
import Image from 'next/image'

import './ProductCardImg.scss'

import { IProductImage } from '@/types/types'

interface IProductCardImgProps {
	variant: 'card' | 'row'
	urls: IProductImage[] | undefined
	onClick: ()=>void
}

const ProductCardImg: React.FC<IProductCardImgProps> = ({ variant, urls , onClick}) => {
	return (
		<div className={`product-card__image-container ${variant}`} onClick={onClick}>
			{/* Add a undefined img */}
			{urls ? (
				<Image
					src={urls[0].url}
					alt={`Image ${urls[0].url}`}
					fill={true}
					className={`product-card__image ${variant}`}
					sizes='(max-width: 600px) 147px, 230px'
					priority={true}
					placeholder='blur'
					blurDataURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbRPTvTIKC4Hr49tsSDrZaG_KmIazHSNIEww&s"
					quality={75}
				/>
			): <div className='product-card__image-placeholder'></div>}
		</div>
	)
}

export default ProductCardImg
