import React from 'react'
import Image from 'next/image'
import nextSvg from '/public/next.svg'
// import likeIcon from '/public/img/like-icon-transparent.svg'

interface IProductCardFavProps {
	id: number
}

const ProductCardFav: React.FC<IProductCardFavProps> = () => {
	return (
		<div className='product-card__like-container'>
			<Image
				src={nextSvg}
				alt={'like-icon'}
				fill={true}
				className='product-card__like-icon'
			/>
		</div>
	)
}

export default ProductCardFav
