import React, { useState } from 'react'
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
		<div className='basket-calculator'>
			<Input
				type={'text'}
				placeholder={word('promo-placeholder')}
				name={'basket-calculator-input'}
				onChange={() => {}}
				inputClassName={'basket-calculator__input'}
			/>
			<Button className='basket-calculator__button'>{word("use-promo-button")}</Button>
			<div className='basket-calculator__info'>
				<div className='basket-calculator__info-word'>{word("discount-price")}</div>
				<div className='basket-calculator__info-number'>{Math.floor(totalDiscount)}₴</div>
			</div>
			<div className='basket-calculator__line'></div>
			<div className='basket-calculator__info price'>
				<div className='basket-calculator__info-word'>{word("whole-price")}</div>
				<div className='basket-calculator__info-number'>{Math.floor(totalPrice)}₴</div>
			</div>
		</div>
	)
}

export default BasketPriceCalculator
