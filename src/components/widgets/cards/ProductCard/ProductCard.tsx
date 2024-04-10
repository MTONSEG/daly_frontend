import './ProductCard.scss'
import { IProduct } from '@/types/types'
import ProductCardFav from '../../../ui/buttons/FavouriteBtn/FavouriteBtn'
import ProductCardImg from './ProductCardImg/ProductCardImg'
import ProductCardInfo from './ProductCardInfo/ProductCardInfo'
import ColorPicker from '../../fragments/ColorPicker/ColorPicker'
import ProductCardMetrics from './ProductCardMetrics/ProductCardMetrics'
import BuyButton from '@/components/ui/buttons/BuyBtn/BuyBtn'
import DeleteBtn from '@/components/ui/buttons/DeleteButton/DeleteBtn'
import { useRouter } from 'next/navigation'

interface IProductCardProps {
	product?: IProduct
	variant: 'card' | 'row'
	isCompared?: boolean
	locale: string[] | string
}

const ProductCard: React.FC<IProductCardProps> = ({ product, variant, isCompared, locale }) => {
	const displayProduct =
		locale === product?.attributes.locale
			? product
			: product &&
			  product.attributes.localizations &&
			  product.attributes.localizations.data.length > 0
			? product.attributes.localizations.data[0]
			: product
	const router = useRouter()
	const handleRouteClick = () => {
		router.push(`/product/${displayProduct && displayProduct.id}`)
	}
	return (
		<div className={`product-card ${variant && variant} ${!displayProduct && 'placeholder'}`}>
			<div className='product-card__fav-container'>
				{displayProduct && <ProductCardFav id={displayProduct.id} isLabeled={false} />}
			</div>

			<ProductCardImg
				variant={variant}
				urls={
					displayProduct && displayProduct.attributes.images && displayProduct.attributes.images
				}
				onClick={handleRouteClick}
			/>

			<div
				className={`product-card__info-container ${!product && 'placeholder'}`}
				onClick={handleRouteClick}
			>
				{displayProduct && (
					<>
						<ProductCardInfo
							category={displayProduct.attributes.category?.data.attributes.label}
							name={displayProduct.attributes.title}
						/>

						<ColorPicker variant='forCard' />
					</>
				)}
			</div>

			<div className={`product-card__button-container ${!product && 'placeholder'}`}>
				{displayProduct && (
					<ProductCardMetrics
						price={displayProduct.attributes.price}
						rating={displayProduct.attributes.rating}
						commsQuantity={
							displayProduct.attributes.product_comments &&
							displayProduct.attributes.product_comments.data.length
						}
					/>
				)}
				{displayProduct && (
					<div className='product-card__buttons'>
						<BuyButton id={displayProduct.id} />
						{isCompared && <DeleteBtn productId={displayProduct.id} />}
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductCard
