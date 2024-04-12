import './ProductCard.scss'
import { IProduct } from '@/types/types'
import ProductCardFav from '../../../ui/buttons/FavouriteBtn/FavouriteBtn'
import ProductCardImg from './ProductCardImg/ProductCardImg'
import ProductCardInfo from './ProductCardInfo/ProductCardInfo'
import ColorPicker from '../../fragments/ColorPicker/ColorPicker'
import ProductCardMetrics from './ProductCardMetrics/ProductCardMetrics'
import BuyButton from '@/components/ui/buttons/BuyBtn/BuyBtn'

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

			<div className='product-card__info-container'>
				<ProductCardInfo
					category={product.attributes.category?.data.attributes.label}
					name={product.attributes.title}
				/>

				<ColorPicker variant='forCard' />
			</div>

			<div className='product-card__button-container'>
				<ProductCardMetrics
					price={product.attributes.price}
					rating={product.attributes.rating}
					commsQuantity={
						product.attributes.product_comments &&
						product.attributes.product_comments.data.length
					}
				/>
				<BuyButton id={product.id} />
			</div>
		</div>
	)
}

export default ProductCard
