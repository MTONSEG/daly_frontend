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
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325516.3770455823!2d30.532690549999998!3d50.402035500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2z0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1710948316581!5m2!1sru!2sua'
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
			<div className='order-delivery__title'>{w('title')}</div>
			<div className='order-delivery__nav'>
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
			</div>
			<div className='order-delivery__content'>
				{deliveryType === 'delivery' && (
					<div className='courier'>
						<div className='courier__left'>
							<DeliveryForm buttonDisabled={true} type='order' />
						</div>
					</div>
				)}
				{deliveryType === 'takeout' && <Pickup />}
			</div>
		</div>
	)
}

export default OrderDelivery
