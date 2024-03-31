import './ProductCard.scss'
import { IProduct } from '@/types/types'
import ProductCardFav from '../../../ui/buttons/FavouriteBtn/FavouriteBtn'
import ProductCardImg from './ProductCardImg/ProductCardImg'
import ProductCardInfo from './ProductCardInfo/ProductCardInfo'
import ColorPicker from '../../fragments/ColorPicker/ColorPicker'
import ProductCardMetrics from './ProductCardMetrics/ProductCardMetrics'
import BuyButton from '@/components/ui/buttons/BuyBtn/BuyBtn'
import DeleteBtn from '@/components/ui/buttons/DeleteButton/DeleteBtn'

interface IProductCardProps {
	product?: IProduct
	variant: 'card' | 'row';
	isCompared?: boolean;
}

const ProductCard: React.FC<IProductCardProps> = ({ product, variant, isCompared }) => {
	return (
		<div className={`product-card ${variant && variant} ${!product && 'placeholder'}`}>
			<div className='product-card__fav-container'>
				{product && <ProductCardFav id={product.id} isLabeled={false} />}
			</div>

			<ProductCardImg
				variant={variant}
				urls={product && product.attributes.images && product.attributes.images}
			/>

			<div className={`product-card__info-container ${!product && 'placeholder'}`}>
				{product && (
					<>
						<ProductCardInfo
							category={product.attributes.category?.data.attributes.label}
							name={product.attributes.title}
						/>

						<ColorPicker variant='forCard' />
					</>
				)}
			</div>

			<div className={`product-card__button-container ${!product && 'placeholder'}`}>
				{product && (
					<ProductCardMetrics
						price={product.attributes.price}
						rating={product.attributes.rating}
						commsQuantity={
							product.attributes.product_comments && product.attributes.product_comments.data.length
						}
					/>
				)}
				{product && (
					<div className='product-card__buttons'>
						<BuyButton id={product.id} />
						{isCompared && <DeleteBtn productId={product.id} />}
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductCard
