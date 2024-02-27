"use client"
import Image from 'next/image'

import likeIcon from '/public/img/like-icon-transparent.svg'

interface IProductCardFavProps {
	id: number
}

const ProductCardFav: React.FC<IProductCardFavProps> = ({ id }) => {
	return (
		<div className='product-card__like-container'>
			<Image
				src={likeIcon}
				alt={'like-icon'}
				fill={true}
				className='product-card__like-icon'
			/>
		</div>
	)
}

export default ProductCardFav
