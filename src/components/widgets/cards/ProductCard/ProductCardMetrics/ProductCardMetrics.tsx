import './ProductCardMetrics.scss'
import { StarIcon } from '@/components/ui/icons'
import { CommentIcon } from '@/components/ui/icons'

interface IProductCardMetricsProps {
	price: number
	discount?: number
	rating: number
	commsQuantity: number | undefined
}

const ProductCardMetrics: React.FC<IProductCardMetricsProps> = ({
	price,
	discount,
	rating,
	commsQuantity
}) => {
	return (
		<div className='product-card__metrics'>
			<div className='product-card__price-block'>
				{discount && discount != undefined && (
					<p className='product-card__discount'>{price - discount} ₴</p>
				)}
				<p
					className={`product-card__price ${
						discount && discount > 0 ? 'discounted' : ''
					}`}
				>
					{price} ₴
				</p>
			</div>

			<div className='product-card__r-c-block'>
				<div className='product-card__r-c-item'>
					{rating} <StarIcon></StarIcon>
				</div>
				<div className='product-card__r-c-item'>
					{commsQuantity ? commsQuantity : '0'} <CommentIcon></CommentIcon>
				</div>
			</div>
		</div>
	)
}

export default ProductCardMetrics
