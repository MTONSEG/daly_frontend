'use client'
import ComplexRadio from '@/components/ui/radios/ComplexRadio'
import './OrderPersonalInfo.scss'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Input from '@/components/ui/forms/Input/Input'

const OrderPersonalInfo = ({}) => {
	const [activeRadio, setActiveRadio] = useState<string>('')
	const w = useTranslations('order')
	const word = useTranslations('personal-info')
	return (
		<div className='order-payment'>
			<div className='order-payment__title'>{w("order-payment-title")}</div>
			<div className='order-payment__radios'>
				<Input></Input>
			</div>
		</div>
	)
}

export default OrderPersonalInfo
