import './ProductCard.scss'
import { IProduct } from '@/types/types'
import ProductCardImg from './ProductCardImg/ProductCardImg'
import ProductCardInfo from './ProductCardInfo/ProductCardInfo'
import ColorPicker from '../../fragments/ColorPicker/ColorPicker'
import ProductCardMetrics from './ProductCardMetrics/ProductCardMetrics'
import { useRouter } from 'next/navigation'
import FavouriteBtn from '@/components/ui/buttons/FavouriteBtn/FavouriteBtn'
import BuyButton from '@/components/ui/buttons/BuyBtn/BuyBtn'
import DeleteBtn from '@/components/ui/buttons/DeleteButton/DeleteBtn'
import { useAppSelector, useAppDispatch } from '@/hooks/useReduxHooks'
import { addFavorite} from '@/store/favourites/favourites.slice'

interface IProductCardProps {
	product?: IProduct
	variant: 'card' | 'row'
	isCompared?: boolean
	locale: string[] | string
	handleLoader?: () => void | undefined
}

const ProductCard: React.FC<IProductCardProps> = ({ product, variant, isCompared, locale, handleLoader }) => {
	function getDisplayProduct(product: IProduct | undefined, locale: string[] | string) {
		
		if (locale === product?.attributes?.locale) {
			return product
		}
		if (
			product &&
			product.attributes?.localizations &&
			product.attributes.localizations.data.length > 0
		) {
			return product.attributes.localizations.data[0]
		}
		return product
	}

	const displayProduct = getDisplayProduct(product, locale)

	const router = useRouter()
	const handleRouteClick = () => {
		router.push(`/${locale}/product/${displayProduct && displayProduct.id}`)
		if (handleLoader) {
			handleLoader()
		}
	}
	const isFavorite = useAppSelector((state) =>
		product ? state.favourites.products.includes(product.id) : false
	)
	const dispatch = useAppDispatch()
	const handleClick = () => {
		if (product) {
			dispatch(addFavorite(product.id))
		}
	}
	return (
		<div className={`product-card ${variant && variant} ${!displayProduct && 'placeholder'}`}>
			<div className='product-card__fav-container'>
				{displayProduct && (
					<FavouriteBtn
						id={displayProduct.id}
						isLabeled={false}
						isFavorite={isFavorite}
						handleClick={handleClick}
					/>
				)}
			</div>

			<ProductCardImg
				variant={variant}
				urls={
					displayProduct && displayProduct.attributes.images && displayProduct.attributes.images
				}
				onClick={handleRouteClick}
			/>

			<section
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
			</section>

			<section className={`product-card__button-container ${!product && 'placeholder'}`}>
				{displayProduct && (
					<ProductCardMetrics
						price={displayProduct.attributes.price}
						rating={displayProduct.attributes.rating}
						discount={displayProduct.attributes.discount}
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
			</section>
		</div>
	)
}

export default ProductCard
