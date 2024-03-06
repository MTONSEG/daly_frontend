import BuyButton from '@/components/ui/buttons/BuyBtn/BuyBtn'
import './ProductInfoRight.scss'
import Button from '@/components/ui/buttons/Button/Button'
import { CompareIcon, LikeIcon } from '@/components/ui/icons'

const ProductInfoRight = () => {
	return (
		<div className='product__info_box'>
			<div className='product__info_box_price-line'>
				<p className='product__info_box_price-line_price_text'>Цена:</p>
				<p className='product__info_box_price-line_price_number'>30 000 ₴</p>
			</div>
			<div className='product__info_box_icons-line'>
				<div className='product__info_box_icon-col'>
					<p className='product__info_box_icon-col_text'>Сравнить</p>
					<p className='product__info_box_icon-col_icon'>
						<CompareIcon />
					</p>
				</div>
				<div className='product__info_box_icon-col'>
					<p className='product__info_box_icon-col_text'>В избранное</p>
					<p className='product__info_box_icon-col_icon'>
						<LikeIcon />
					</p>
				</div>
			</div>
			<Button className='product__info_buy-btn' variant='product'>
				Купить
			</Button>
		</div>
	)
}

export default ProductInfoRight
