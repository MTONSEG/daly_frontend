import React from 'react'
import './ProductCard.scss'

import { IProduct } from '@/types/types'

import ProductCardFav from '../../../ui/buttons/FavouriteBtn/FavouriteBtn'
import ProductCardImg from './ProductCardImg/ProductCardImg'
import ProductCardInfo from './ProductCardInfo/ProductCardInfo'
import ColorPicker from '../../ColorPicker/ColorPicker'
import ProductCardMetrics from './ProductCardMetrics/ProductCardMetrics'
import BuyButton from '@/components/ui/buttons/BuyBtn/BuyBtn'

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
				urls={product.attributes.images && product.attributes.images}
			></ProductCardImg>
			<ProductCardInfo
				category={
					product.attributes.category &&
					product.attributes.category.data.attributes.label
				}
				name={product.attributes.title}
			></ProductCardInfo>
			<ColorPicker variant='forCard'></ColorPicker>
			<ProductCardMetrics
				price={product.attributes.price}
				rating={product.attributes.rating}
				commsQuantity={
					product.attributes.product_comments &&
					product.attributes.product_comments.data.attributes.length
				}
			></ProductCardMetrics>

			<BuyButton id={product.id}></BuyButton>
		</div>
	)
}

export default ProductCard
