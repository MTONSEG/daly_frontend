'use client'
import ComplexRadio from '@/components/ui/radios/ComplexRadio'
import './OrderPayment.scss'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { fillPaymentData } from '@/store/order/order.slice'
export type PaymentType = 'online' | 'installment payment' | 'upon receipt' | 'digital wallet'
const OrderPayment = ({}) => {
	const w = useTranslations('order')
	const word = useTranslations('payment')
	const [activeRadio, setActiveRadio] = useState<
		'online' | 'installment payment' | 'upon receipt' | 'digital wallet'
	>('online')
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fillPaymentData({ paymentMethod: activeRadio }))
	}, [activeRadio])

	const radios = {
		payments: [
			{
				label: 'online' as PaymentType,
				title: word('title-1'),
				description: word('description-1'),
				link: undefined
			},
			{
				label: 'installment payment' as PaymentType,
				title: word('title-2'),
				description: word('description-2'),
				link: word('link-2')
			},
			{
				label: 'upon receipt' as PaymentType,
				title: word('title-3'),
				description: word('description-3'),
				link: undefined
			},
			{
				label: 'digital wallet' as PaymentType,
				title: word('title-4'),
				description: word('description-4'),
				link: undefined
			}
		]
	}
	return (
		<section className='order-block'>
			<h5 className='order-block__title'>{w('payment-title')}</h5>
			<ul className='order-block__content'>
				{radios.payments.map((radio, index) => (
					<ComplexRadio
						label={radio.label}
						title={radio.title}
						description={radio.description}
						link={radio.link}
						radioActive={activeRadio}
						setActive={setActiveRadio}
						key={index}
					/>
				))}
			</ul>
		</section>
	)
}

export default OrderPayment
