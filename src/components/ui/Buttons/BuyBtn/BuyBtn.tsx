'use client'
import { CartIconThick } from '../../icons'
import { useTranslations } from 'next-intl'
import './BuyBtn.scss'
import { useAppSelector, useAppDispatch } from '@/hooks/useReduxHooks'
import { addProduct } from '@/store/basket/basket.slice'

interface IBuyButtonProps {
	id: number
}

const BuyButton: React.FC<IBuyButtonProps> = ({ id }) => {
	const t = useTranslations('catalog')
	const dispatch = useAppDispatch()
	const product = useAppSelector((state) =>
		state.basket.products.find((p) => p.id === id)
	)

	const handleClick = () => {
		dispatch(addProduct({ id }))
	}

	const buttonText = product
		? t('buy-button-active')
		: t('buy-button-not-active')

	return (
		<button className='buy-button' onClick={handleClick} aria-label='buy-button'>
			{buttonText}
			<CartIconThick className='buy-button__icon' />
		</button>
	)
}

export default BuyButton
