'use client'
import ComplexRadio from '@/components/ui/radios/ComplexRadio'
import './OrderPayment.scss'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const OrderPayment = ({}) => {
	const w = useTranslations('order')
	const word = useTranslations('payment')
	const [activeRadio, setActiveRadio] = useState<string>(word('title-1'))
	const radios = {
		payments: [
			{
				title: word('title-1'),
				description: word('description-1'),
				link: undefined
			},
			{
				title: word('title-2'),
				description: word('description-2'),
				link: word('link-2')
			},
			{
				title: word('title-3'),
				description: word('description-3'),
				link: undefined
			},
			{
				title: word('title-4'),
				description: word('description-4'),
				link: undefined
			}
		]
	}
	return (
		<div className='order-block'>
			<div className='order-block__title'>{w("order-payment-title")}</div>
			<div className='order-block__content'>
				{radios.payments.map((radio, index) => (
					<ComplexRadio
						key={index}
						title={radio.title}
						description={radio.description}
						link={radio.link}
						radioActive={activeRadio}
						setActive={setActiveRadio}
					/>
				))}
			</div>
		</div>
	)
}

export default OrderPayment
