'use client'
import { Dispatch, SetStateAction } from 'react'
import './ComplexRadio.scss'
import Link from 'next/link'
import { PaymentType } from '@/components/screens/Order/OrderPayment/OrderPayment'
interface IComplexRadio {
	label: PaymentType
	title: string
	description: string
	link?: string
	radioActive: PaymentType
	setActive: Dispatch<SetStateAction<PaymentType>>
}

const ComplexRadio: React.FC<IComplexRadio> = ({
	label,
	title,
	description,
	link,
	radioActive,
	setActive
}) => {
	return (
		<div
			className={`complex-radio ${radioActive === label && 'active'}`}
			onClick={() => {
				setActive(label)
			}}
		>
			<div className='complex-radio__title'>
				<div className='complex-radio__radio'></div>
				{title}
			</div>
			<div className='complex-radio__content'>
				{description}
				{link && <Link href={"haha-lox"} className='complex-radio__link'>{link}</Link>}
			</div>
		</div>
	)
}

export default ComplexRadio
