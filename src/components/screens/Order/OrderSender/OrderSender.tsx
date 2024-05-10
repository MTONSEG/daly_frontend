'use client'
import { useTranslations } from 'next-intl'

import Button from '@/components/ui/buttons/Button/Button'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'

import { createOrder } from '@/store/api/order.api'
import { IOrderData } from '@/store/order/order.slice'
import { useState } from 'react'
export interface StrapiOrder {
	name: string | undefined
	surn: string | undefined
	email: string | undefined
	phone: number | undefined
	payment: string | undefined
	deliveryType: string | undefined
	city: string | undefined
	deliveryData: string | undefined
	deliveryTime: string | undefined
	address: string | undefined
	products:
		| undefined
		| {
				product: number[]
				quantity: number
		  }[]
}

const OrderSender = () => {
	const word = useTranslations('order')
	const dispatch: any = useAppDispatch()

	const order = useAppSelector((state) => state.order)
	const [showPopup, setShowPopup] = useState<boolean>(false)

	const transformOrderData = (orderData: IOrderData): StrapiOrder | null => {
		const { order } = orderData
		if (
			Object.values(order).some((value) => value === undefined) ||
			order.productsSets === undefined
		) {
			setShowPopup(true) // Show popup when fields are not filled
			return null
		}
		setShowPopup(false) // Hide popup when all fields are filled

		const products = order.productsSets?.map((set) => ({
			product: [set.id],
			quantity: set.quantity
		}))

		const transformedOrder: StrapiOrder = {
			name: order.name,
			surn: order.surname,
			email: order.email,
			phone: order.phoneNumber,
			payment: order.paymentMethod,
			deliveryType: order.deliveryType,
			city: order.deliveryTown,
			deliveryData: order.deliveryDate,
			deliveryTime: order.deliveryTime,
			address: order.deliveryAddress,
			products: products || [] // Assign the products array, default to empty array if products is undefined
		}

		return transformedOrder
	}

	const handleCreateOrder = () => {
		const transformedOrder = transformOrderData(order)
		if (!transformedOrder) {
			console.error('Failed to transform order data')
			return
		}

		console.log('🚀 ~ handleCreateOrder ~ transformedOrder:', transformedOrder)
		dispatch(createOrder(transformedOrder))
	}

	return (
		<div className='order__bottom'>
			{showPopup && (
				<div className='order__popup'>
					<Button className='order__order-button' onClick={() => setShowPopup(false)}>
						{word('fill-popup-close-button')}
					</Button>
					<p className='order__popup-text'>{word('fill-popup-text')}</p>
				</div>
			)}
			<Button className='order__order-button' onClick={handleCreateOrder}>
				{word('buy-button')}
			</Button>
			<div className='order__aggreement'>
				{word('buy-aggreement')}
				<span>{word('buy-aggreement-link')}</span>
			</div>
		</div>
	)
}

export default OrderSender
