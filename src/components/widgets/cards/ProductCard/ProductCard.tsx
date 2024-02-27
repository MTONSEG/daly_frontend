import React from 'react'
import './ProductCard.scss'

import { IProduct } from '@/types/types'

import ProductCardFav from './ProductCardFav/ProductCardFav'
import ProductCardImg from './ProductCardImg/ProductCardImg'
import ProductCardInfo from './ProductCardInfo/ProductCardInfo'
import ColorPicker from '../../ColorPicker/ColorPicker'
import BuyButton from '@/components/ui/Buttons/BuyButton/BuyButton'

interface IProductCardProps {
	product: IProduct
	variant: 'card' | 'row'
}

const ProductCard: React.FC<IProductCardProps> = ({ product, variant }) => {
	return (
		<div className={`product-card ${variant && variant}`}>
			<ProductCardFav id={product.id}></ProductCardFav>
			<ProductCardImg
				variant={variant}
				urls={product.attributes.images}
			></ProductCardImg>
			<ProductCardInfo
				category={product.attributes.category.data.attributes.label}
				name={product.attributes.title}
			></ProductCardInfo>
			<ColorPicker variant='forCard'></ColorPicker>
			<BuyButton id={product.id}></BuyButton>
		</div>
	)
}

export default ProductCard
