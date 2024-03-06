import './ProductInfoRight.scss'
import Button from '@/components/ui/buttons/Button/Button'
import { CompareIcon, LikeIcon } from '@/components/ui/icons'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

interface IProductInfoRight {
	price: number
}

const ProductInfoRight: FC<IProductInfoRight> = ({ price }) => {
	const t = useTranslations('product')

	const compareHandler = () => {
		// функционал позже добавиться
	}

	const favouriteHandler = () => {
		//
	}

	const onBuyHandler = () => {}

	return (
		<div className='product__info_box'>
			<div className='product__info_box_price-line'>
				<p className='product__info_box_price-line_price_text'>{t('price')}</p>
				<p className='product__info_box_price-line_price_number'>{price} ₴</p>
			</div>
			<div className='product__info_box_icons-line'>
				<div className='product__info_box_icon-col' onClick={compareHandler}>
					<p className='product__info_box_icon-col_text' onClick={favouriteHandler}>
						{t('compare')}
					</p>
					<p className='product__info_box_icon-col_icon'>
						<CompareIcon />
					</p>
				</div>
				<div className='product__info_box_icon-col'>
					<p className='product__info_box_icon-col_text'>{t('favourite')}</p>
					<p className='product__info_box_icon-col_icon'>
						<LikeIcon />
					</p>
				</div>
			</div>
			<Button className='product__info_buy-btn' variant='product' onClick={onBuyHandler}>
				{t('buy')}
			</Button>
		</div>
	)
}

export default ProductInfoRight
