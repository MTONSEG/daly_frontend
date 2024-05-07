'use client'
import { useTranslations } from 'next-intl'

import Button from '@/components/ui/buttons/Button/Button'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'

import { createOrder } from '@/store/api/order.api'
import { useParams } from 'next/navigation'
import { IOrderData } from '@/store/order/order.slice'
import { IOrder } from '@/types/types'
import { AsyncThunkAction, Dispatch, UnknownAction } from '@reduxjs/toolkit'

const OrderSender = () => {
	const word = useTranslations('order')
	const dispatch = useAppDispatch()

	const order = useAppSelector((state) => state.order)
	console.log('🚀 ~ order:', order)

	// Define a function to transform the order data
	const transformOrderData = (orderData: IOrderData) => {
		const { order } = orderData
		console.log('🚀 ~ transformOrderData ~ order:', order)

		// Map over order.productsSets to create the products array
		const products = order.productsSets.map((set) => ({
			set: [set.id],
			quantity: set.quantity
		}))

		// Flatten and transform the order object
		const transformedOrder = {
			name: order.name,
			surname: order.surname,
			email: order.email,
			phoneNumber: order.phoneNumber,
			paymentMethod: order.paymentMethod,
			deliveryType: order.deliveryType,
			deliveryTown: order.deliveryTown,
			deliveryDate: order.deliveryDate,
			deliveryTime: order.deliveryTime,
			deliveryAddress: order.deliveryAddress,
			deliveryApartment: order.deliveryApartment,
			deliveryComment: order.deliveryComment,
			products: products // Assign the products array
		}

		return transformedOrder
	}

	const { locale } = useParams()

	// const { mutate: createOrder } = useCreateOrderMutation()

	const handleCreateOrder = () => {
		console.log('created order')
		const transformedOrder = transformOrderData(order)
		console.log('🚀 ~ handleCreateOrder ~ transformedOrder:', transformedOrder)
		dispatch(createOrder([locale, transformedOrder]))
	}

	return (
		<div className='order__bottom'>
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
