import React from 'react'
import './ProductCardInfo.scss'

interface IProductCardInfoProps {
	category: string | undefined
	name: string
}

const ProductCardInfo: React.FC<IProductCardInfoProps> = ({
	category,
	name
}) => {

	return (
		<div className='product-card__info'>
			<p className='product-card__category'>{category}</p>
			<p className='product-card__name'>{name}</p>
		</div>
	)
}

export default ProductCardInfo
