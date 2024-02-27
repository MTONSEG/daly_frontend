import React from 'react'
import Image from 'next/image'

import { IImage } from '@/types/types'

interface IProductCardImgProps {
	variant: 'card' | 'row'
	urls: IImage[]
}

const ProductCardImg: React.FC<IProductCardImgProps> = ({ variant, urls }) => {
	return (
		<div className={`product-card__image-container ${variant}`}>
			<Image
				src={urls[0].url}
				alt={`Image ${urls[0].url}`}
				fill={true}
				className={`product-card__image ${variant}`}
			/>
		</div>
	)
}

export default ProductCardImg
