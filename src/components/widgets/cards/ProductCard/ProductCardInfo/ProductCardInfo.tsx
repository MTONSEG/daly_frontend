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
	const trimText = (text: string | undefined, maxLength: number) => {
		if (!text) return ''
		if (text.length <= maxLength) return text
		return text.slice(0, maxLength) + '...'
	}

	const trimmedCategory = trimText(category, 10) // Set the maximum length for category
	const trimmedName = trimText(name, 15) // Set the maximum length for name

	return (
		<div className='product-card__info'>
			<p className='product-card__category'>{trimmedCategory}</p>
			<p className='product-card__name'>{trimmedName}</p>
		</div>
	)
}

export default ProductCardInfo
