'use client'
import Container from '@/components/ui/containers/Container/Container'
import './OrderDelivery.scss'
import Delivery from '../../Product/Tabs/Delivery/Delivery'
import { motion } from 'framer-motion'
import { cardVariant } from '../../Product/Tabs/TabStructure/variants'

const OrderDelivery = ({}) => {
	return (
		<Container variant='fullscreen'>
			<div className='order-delivery'>
				<motion.div
					variants={cardVariant}
					role='tabpanel'
					className={`tab-content active`}
					animate={'active'}
				>
					<Delivery />
				</motion.div>
			</div>
		</Container>
	)
}

export default OrderDelivery
