import Container from '@/components/ui/containers/Container/Container'
import './Order.scss'
import { FC } from 'react'
import { useTranslations } from 'next-intl'
import OrderProductsList from './OrderProductsList/OrderProductsList'
import OrderTitle from './OrderTitle/OrderTitle'
import OrderDelivery from './OrderDelivery/OrderDelivery'
import OrderPayment from './OrderPayment/OrderPayment'
import OrderPersonalInfo from './OrderPersonalInfo/OrderPersonalInfo'
import ScrollToBtn from '@/components/ui/buttons/ScrollToBtn/ScrollToBtn'
import OrderSender from './OrderSender/OrderSender'

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
				<Container>
					<OrderDelivery />
				</Container>
				<ScrollToBtn text={word('next-button')} elementId={'order-payment'} />
				<Container variant='block'>
					<div className='order__payment' id='order-payment'>
						<OrderPayment />
					</div>
				</Container>
				<ScrollToBtn text={word('next-button')} elementId={'order-personal-info'} />
				<Container variant='block'>
					<div className='order__personal-info' id='order-personal-info'>
						<OrderPersonalInfo />
					</div>
				</Container>
				<OrderSender/>
			</div>
		</Container>
	)
}

export default Order
