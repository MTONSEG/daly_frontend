import './ProductInfoRight.scss'
import Button from '@/components/ui/buttons/Button/Button'

const ProductInfoRight = () => {
	return (
		<div className='product__info__right'>
			<div className='product__info_box'>
				<div className='product__info_box_price-line'>
					<p className='product__info_box_price-line_price_text'>Цена</p>
					<p className='product__info_box_price-line_price_number'>299</p>
				</div>
				<div className='product__info_box_icons-line'>
					<div className='product__info_box_price-line_icon'>
						<p className='product__info_box_price-line_icon_text'>Цена</p>
						<p className='product__info_box_price-line_icon_icon'>Цена</p>
					</div>
					<div className='product__info_box_price-line_icon'>
						<p className='product__info_box_price-line_icon_text'>Цена</p>
						<p className='product__info_box_price-line_icon_icon'>Цена</p>
					</div>
				</div>
				<Button className='product__info_buy-btn'>1</Button>
			</div>
		</div>
	)
}

export default ProductInfoRight
