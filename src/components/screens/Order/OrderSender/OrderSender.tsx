"use client"
import { FC } from 'react'
import { useTranslations } from 'next-intl'

import Button from '@/components/ui/buttons/Button/Button'
import { useAppSelector } from '@/hooks/useReduxHooks'

interface IOrder {}

const OrderSender: FC<IOrder> = ({}) => {
    const word = useTranslations('order')
    
    const order = useAppSelector((state)=>state.order);
    console.log("🚀 ~ order:", order)

	return (
		<div className='order__bottom'>
			<Button className='order__order-button'>{word('buy-button')}</Button>
			<div className='order__aggreement'>
				{word('buy-aggreement')}
				<span>{word('buy-aggreement-link')}</span>
			</div>
		</div>
	)
}

export default OrderSender
