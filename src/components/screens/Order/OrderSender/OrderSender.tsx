'use client'
import { useTranslations } from 'next-intl'

import Button from '@/components/ui/Buttons/Button/Button'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { createOrder } from '@/store/api/order.api'
import { IOrderData } from '@/store/order/order.slice'
import { useState } from 'react'
import StatusPopup from '@/components/ui/forms/StatusPopup/StatusPopup'
import { useParams, useRouter } from 'next/navigation'

export interface StrapiOrder {
	name: string | undefined
	surn: string | undefined
	email: string | undefined
	phone: string | undefined
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
	const router = useRouter()
	const { locale } = useParams()
	const word = useTranslations('order')
	const dispatch = useAppDispatch()
	const order = useAppSelector((state) => state.order)
	const [orderStatus, setOrderStatus] = useState<'waiting' | 'idle' | 'success' | 'failed'>('idle') // Track order success state

	const transformOrderData = (orderData: IOrderData): StrapiOrder | null => {
		const { order } = orderData
		if (
			Object.values(order).some((value) => value === undefined) ||
			order.productsSets === undefined
		) {
			return null
		}

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

	const handleCreateOrder = async () => {
		setOrderStatus('waiting')
		const transformedOrder = transformOrderData(order)
		if (!transformedOrder) {
			console.error('Failed to transform order data')
			setOrderStatus('failed')
			return
		}

		try {
			// Dispatch createOrder action
			await dispatch(createOrder(transformedOrder))
			setOrderStatus('success') // Set order success to true
		} catch (error) {
			console.error('Error creating order:', error)
			setOrderStatus('failed') // Set order success to false in case of error
		}
	}

	const handleStatusPopupClose = () => {
		if (orderStatus === 'success') {
			router.push(`/${locale}/catalog`)
		} else if (orderStatus === 'failed') {
			setOrderStatus('idle')
		}
	}

	return (
		<div className='order__bottom'>
			<StatusPopup status={orderStatus} onClose={handleStatusPopupClose} />

			<Button className='order__order-button' onClick={handleCreateOrder}>
				{word('buy-button')}
			</Button>
			<article className='order__aggreement'>
				{word('buy-aggreement')}
				<span>{word('buy-aggreement-link')}</span>
			</article>
		</div>
	)
}

export default OrderSender
