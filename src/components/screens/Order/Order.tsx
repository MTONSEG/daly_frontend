import Container from '@/components/ui/containers/Container/Container'
import './Order.scss'
import { FC } from 'react'
import { useTranslations } from 'next-intl'
import OrderProductsList from './OrderProductsList/OrderProductsList'
import OrderTitle from './OrderTitle/OrderTitle'
import OrderDelivery from './OrderDelivery/OrderDelivery'
import OrderPayment from './OrderPayment/OrderPayment'

interface IOrder {}

const Order: FC<IOrder> = ({}) => {
	const word = useTranslations('order')

	return (
		<Container>
			<div className='order'>
				<OrderTitle />
				<Container variant='block'>
					<div className='order__chosen-list'>
						<OrderProductsList />
					</div>
				</Container>
				{/* <Container>
					<OrderDelivery />
				</Container> */}

				<Container variant='block'>
					<div className='order__payment'>
						<OrderPayment />
					</div>
				</Container>
			</div>
		</Container>
	)
}

export default Order
