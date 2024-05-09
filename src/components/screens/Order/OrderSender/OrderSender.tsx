'use client'
import { useTranslations } from 'next-intl'

import Button from '@/components/ui/buttons/Button/Button'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'

import { createOrder } from '@/store/api/order.api'
import { IOrderData } from '@/store/order/order.slice'
export interface StrapiOrder {
	name: string | undefined
	surname: string | undefined
	email: string | undefined
	phoneNumber: number | undefined
	paymentMethod: string | undefined
	deliveryType: string | undefined
	deliveryTown: string | undefined
	deliveryDate: string | undefined
	deliveryTime: string | undefined
	deliveryAddress: string | undefined
	deliveryApartment: string | undefined
	deliveryComment: string | undefined
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

	// Define a function to transform the order data
	const transformOrderData = (orderData: IOrderData): StrapiOrder | null => {
		const { order } = orderData

		// Validation: Check if any field in orderData is undefined
		if (
			Object.values(order).some((value) => value === undefined) ||
			order.productsSets === undefined
		) {
			console.error('One or more fields in orderData are undefined')
			// You can display an error message, throw an error, or return null
			return null
		}

		// Map over order.productsSets to create the products array
		const products = order.productsSets?.map((set) => ({
			product: [set.id],
			quantity: set.quantity
		}))

		// Flatten and transform the order object
		const transformedOrder: StrapiOrder = {
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
			products: products || [] // Assign the products array, default to empty array if products is undefined
		}

		return transformedOrder
	}

	// const { mutate: createOrder } = useCreateOrderMutation()

	const handleCreateOrder = () => {
		const transformedOrder = transformOrderData(order)
		// if (!transformedOrder) {
		// 	// Handle error: Display error message, show alert, etc.
		// 	console.error('Failed to transform order data')
		// 	return
		// }

		console.log('🚀 ~ handleCreateOrder ~ transformedOrder:', transformedOrder)
		dispatch(createOrder(transformedOrder))
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
