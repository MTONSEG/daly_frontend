import React from 'react'
import './BasketPriceCalculator.scss'
import Input from '@/components/ui/forms/Input/Input'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/buttons/Button/Button'

interface IBasketPriceCalculatorProps {
	totalPrice: number
	totalDiscount: number
}

const BasketPriceCalculator: React.FC<IBasketPriceCalculatorProps> = ({
	totalPrice,
	totalDiscount
}) => {
	const word = useTranslations('basket')
	return (
		<article className='basket-calculator'>
			<Input
				type={'text'}
				placeholder={word('promo-placeholder')}
				name={'basket-calculator-input'}
				onChange={() => {}}
				inputClassName={'basket-calculator__input'}
			/>
			<Button className='basket-calculator__button'>{word('use-promo-button')}</Button>
			<div className='basket-calculator__info'>
				<p className='basket-calculator__info-word'>{word('discount-price')}</p>
				<p className='basket-calculator__info-number'>{Math.floor(totalDiscount)}₴</p>
			</div>
			<div className='basket-calculator__line'></div>
			<div className='basket-calculator__info price'>
				<p className='basket-calculator__info-word'>{word('whole-price')}</p>
				<p className='basket-calculator__info-number'>{Math.floor(totalPrice)}₴</p>
			</div>
		</article>
	)
}

export default BasketPriceCalculator
