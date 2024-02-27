import React, { useState } from 'react'

interface IProductCardInfoProps {
	category: string
	name: string
}

const ProductCardInfo: React.FC<IProductCardInfoProps> = ({
	category,
	name
}) => {
	return (
		<div className='product-card__info'>
			<p className='product-card__category'>{category}</p>
			<p className='profuct-card__name'>{name}</p>
		</div>
	)
}

export default ProductCardInfo
