import './ProductInfoAction.scss'
import Button from '@/components/ui/buttons/Button/Button'
import { CompareIcon, LikeIcon } from '@/components/ui/icons'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

interface IProductInfoAction {
	price: number
}

const ProductInfoAction: FC<IProductInfoAction> = ({ price }) => {
	const t = useTranslations('product')

	const compareHandler = () => {
		// функционал позже добавиться
	}

	const favouriteHandler = () => {
		//
	}

	const onBuyHandler = () => {}

	return (
		<div className='info__box'>
			<div className='info__box__price-line'>
				<p className='info__box__price-line__price__text'>{t('price')}</p>
				<p className='info__box__price-line__price__number'>{price} ₴</p>
			</div>
			<div className='info__box__icons-line'>
				<div className='info__box__icon-col' onClick={compareHandler}>
					<p className=' info__box__icon-col__text' onClick={favouriteHandler}>
						{t('compare')}
					</p>
					<p className=' info__box__icon-col__icon'>
						<CompareIcon />
					</p>
				</div>
				<div className=' info__box__icon-col'>
					<p className=' info__box__icon-col__text'>{t('favourite')}</p>
					<p className=' info__box__icon-col__icon'>
						<LikeIcon />
					</p>
				</div>
			</div>
			<Button className=' info__buy-btn' variant='product' onClick={onBuyHandler}>
				{t('buy')}
			</Button>
		</div>
	)
}

export default ProductInfoAction
