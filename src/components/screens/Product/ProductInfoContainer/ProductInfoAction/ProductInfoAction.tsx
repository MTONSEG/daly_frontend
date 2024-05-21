import './ProductInfoAction.scss'
import Button from '@/components/ui/buttons/Button/Button'
import { CompareIcon } from '@/components/ui/icons'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { addFavorite } from '@/store/favourites/favourites.slice'
import { removeFavorite } from '@/store/favourites/favourites.slice'
import { FavoriteIconGreen } from '@/components/ui/icons'

interface IProductInfoAction {
	price: number
	id: number
}

const ProductInfoAction: FC<IProductInfoAction> = ({ price, id }) => {
	const dispatch = useAppDispatch()
	const t = useTranslations('product')

	const compareHandler = () => {
		// функционал позже добавиться
	}

	// const favouriteHandler = () => {
	// 	dispatch(addFavorite(id))
	// }
	const isFavorite = useAppSelector((state) => state.favourites.products.includes(id))

	const handleClick = () => {
		if (isFavorite) {
			dispatch(removeFavorite(id))
		} else {
			dispatch(addFavorite(id))
		}
	}

	const onBuyHandler = () => {}

	return (
		<div className='action-box'>
			<div className='action-box__price-line'>
				<p className='price-line__text'>{t('price')}</p>
				<p className='price-line__number'>{price} ₴</p>
			</div>

			<div className='action-box__icons-line'>
				<Button className='icons-line__col' onClick={compareHandler}>
					<p className='icons-line__text'>{t('compare')}</p>
					<p className='icons-line__icon'>
						<CompareIcon />
					</p>
				</Button>

				<Button className='icons-line__col' onClick={handleClick}>
					<p className='icons-line__text'>{t('favourite')}</p>
					<p className='icons-line__icon'>
						<FavoriteIconGreen
							className={`favourite-button__favourite-icon ${isFavorite && 'active'}`}
						/>
					</p>
				</Button>
			</div>

			<Button className='action-box__buy-btn' variant='product' onClick={onBuyHandler}>
				{t('buy')}
			</Button>
		</div>
	)
}

export default ProductInfoAction
