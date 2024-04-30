'use client'
import Container from '@/components/ui/containers/Container/Container'
import './Order.scss'
import { FC } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowLeft } from '@/components/ui/icons'
import OrderProductsList from './OrderProductsList/OrderProductsList'
import Delivery from '../Product/Tabs/Delivery/Delivery'

interface IOrder {}

const Order: FC<IOrder> = ({}) => {
	const word = useTranslations('order')

	return (
		<Container>
			<div className='order'>
				<div className='order__title'>
					<ArrowLeft className='order__title-arrow' />
					{word('title')}
				</div>
				<Container variant='block'>
					<div className='order__chosen-list'>
						<OrderProductsList />
					</div>
				</Container>
				<Container variant='block'>
					<div className='order__delivery'>
						<Delivery></Delivery>
					</div>
				</Container>
				ghfdh
			</div>
		</Container>
	)
}

export default Order
