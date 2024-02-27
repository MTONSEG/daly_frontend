import React from 'react'
import './ProductCard.scss'

import { IProduct } from '@/types/types'

import ProductCardFav from '../../../ui/buttons/FavouriteButton/FavouriteButton'
import ProductCardImg from './ProductCardImg/ProductCardImg'
import ProductCardInfo from './ProductCardInfo/ProductCardInfo'
import ColorPicker from '../../ColorPicker/ColorPicker'
import BuyButton from '@/components/ui/buttons/BuyButton/BuyButton'

interface IProductCardProps {
	product: IProduct
	variant: 'card' | 'row'
}

const ProductCard: React.FC<IProductCardProps> = ({ product, variant }) => {
	return (
		<div className={`product-card ${variant && variant}`}>
			<div className='product-card__fav-container'>
				<ProductCardFav id={product.id} isLabeled={false}></ProductCardFav>
			</div>
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
