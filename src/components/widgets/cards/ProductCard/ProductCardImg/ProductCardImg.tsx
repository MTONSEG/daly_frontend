import React from 'react'
import Image from 'next/image'

import './ProductCardImg.scss'

import { IImage } from '@/types/types'

interface IProductCardImgProps {
	variant: 'card' | 'row'
	urls: IImage[] | undefined
}

const ProductCardImg: React.FC<IProductCardImgProps> = ({ variant, urls }) => {
	return (
		<div className={`product-card__image-container ${variant}`}>
			{/* Add a undefined img */}
			{urls && (
				<Image
					src={urls[0].url}
					alt={`Image ${urls[0].url}`}
					fill={true}
					className={`product-card__image ${variant}`}
				/>
			)}
		</div>
	)
}

export default ProductCardImg
