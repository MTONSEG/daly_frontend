'use client'
import Container from '@/components/ui/containers/Container/Container'
import './OrderDelivery.scss'
import '../../Product/Tabs/Delivery/Delivery.scss'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import DeliveryForm from '../../Product/Tabs/Delivery/DeliveryForm/DeliveryForm'
import { TelIcon } from '@/components/ui/icons'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { fillDeliveryData } from '@/store/order/order.slice'

const Pickup = () => {
	const tD = useTranslations('delivery')

	return (
		<div className='pickup'>
			<h2 className='pickup__title'>{tD('goodAvailibility')}</h2>
			<div className='pickup__content'>
				<div className='pickup__adress'>
					<p className='pickup__city'>{tD('templateAdress')}</p>
					<div className='pickup__time'>{tD('workWeek')}</div>
					<div className='pickup__tel-wr'>
						<a className='pickup__tel' href='tel:+38 (968) 430-88-20'>
							<TelIcon /> <span>+38 (968) 430-88-20</span>
						</a>
					</div>
				</div>

				<iframe
					className='pickup__iframe'
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.027126430393!2d30.489055711714517!3d50.44059538795537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cfa161bd7569%3A0xafbbaf0f38d7fd6b!2sDaily%20Shop!5e0!3m2!1sru!2sua!4v1715709702011!5m2!1sru!2sua" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
					loading='lazy'
				></iframe>
			</div>
		</div>
	)
}

const OrderDelivery = ({}) => {
	const dispatch = useAppDispatch()
	const w = useTranslations('order-delivery')
	const [deliveryType, setDeliveryType] = useState<'delivery' | 'takeout'>('delivery')
	useEffect(() => {
		dispatch(
			fillDeliveryData({
				deliveryType: deliveryType
			})
		)
	}, [deliveryType, dispatch])
	const handleDeliveryChange = (deliveryType: 'delivery' | 'takeout') => {
		setDeliveryType(deliveryType)
	}

	return (
		<div className='order-delivery'>
			<h4 className='order-delivery__title'>{w('title')}</h4>
			<nav className='order-delivery__nav'>
				<div
					className={`order-delivery__nav-item ${deliveryType === 'delivery' && 'active'}`}
					onClick={() => {
						handleDeliveryChange('delivery')
					}}
				>
					{w('nav-1')}
				</div>
				<div
					className={`order-delivery__nav-item ${deliveryType === 'takeout' && 'active'}`}
					onClick={() => {
						handleDeliveryChange('takeout')
					}}
				>
					{w('nav-2')}
				</div>
			</nav>
			<section className='order-delivery__content'>
				{deliveryType === 'delivery' && (
					<div className='courier'>
						<div className='courier__left'>
							<DeliveryForm buttonDisabled={true} type='order' />
						</div>
					</div>
				)}
				{deliveryType === 'takeout' && <Pickup />}
			</section>
		</div>
	)
}

export default OrderDelivery
