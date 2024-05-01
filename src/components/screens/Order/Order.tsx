import Container from '@/components/ui/containers/Container/Container'
import './Order.scss'
import { FC } from 'react'
import { useTranslations } from 'next-intl'
import OrderProductsList from './OrderProductsList/OrderProductsList'
import Delivery from '../Product/Tabs/Delivery/Delivery'
import OrderTitle from './OrderTitle/OrderTitle'

interface IOrder {}

const Order: FC<IOrder> = ({}) => {
	const word = useTranslations('order')



	return (
		<Container>
			<div className='order'>

				<OrderTitle/>
				<Container variant='block'>
					<div className='order__chosen-list'>
						<OrderProductsList />
					</div>
				</Container>
				<Container variant='block'>
					<div className='order__delivery'>
						{/* <Delivery></Delivery> */}
					</div>
				</Container>
				ghfdh
			</div>
		</Container>
	)
}

export default Order
