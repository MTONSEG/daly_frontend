'use client'
import { CartIconThick } from '../../icons'
import { useTranslations } from 'next-intl'
import './BuyBtn.scss'

interface IBuyButtonProps {
	id: number
}

const BuyButton: React.FC<IBuyButtonProps> = ({ id }) => {
	const t = useTranslations('catalog')

	const buyButtonText = t('buy-button-not-active')
	const toBasketText = t('buy-button-active')
	return (
		<div className='buy-button'>
			{buyButtonText}
			<CartIconThick className='buy-button__icon'></CartIconThick>
		</div>
	)
}

export default BuyButton
