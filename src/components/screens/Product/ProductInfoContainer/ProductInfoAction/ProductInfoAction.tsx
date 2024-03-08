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
		<div className='action-box'>
			<div className='action-box__price-line'>
				<p className='price-line__text'>{t('price')}</p>
				<p className='price-line__number'>{price} ₴</p>
			</div>
			<div className='action-box__icons-line'>
				<div className='icons-line__col' onClick={compareHandler}>
					<p className='icons-line__text' onClick={favouriteHandler}>
						{t('compare')}
					</p>
					<p className='icons-line__icon'>
						<CompareIcon />
					</p>
				</div>
				<div className='icons-line__col'>
					<p className='icons-line__text'>{t('favourite')}</p>
					<p className='icons-line__icon'>
						<LikeIcon />
					</p>
				</div>
			</div>
			<Button className='action-box__buy-btn' variant='product' onClick={onBuyHandler}>
				{t('buy')}
			</Button>
		</div>
	)
}

export default ProductInfoAction
