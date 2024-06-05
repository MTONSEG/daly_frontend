import React, { useState } from 'react'
import TabHead from '../TabStructure/TabHead'
import TabContent from '../TabStructure/TabContent'
import { ITab } from '../Tabs'
import LinkBtn from '@/components/ui/Buttons/LinkBtn/LinkBtn'
import { TelIcon } from '@/components/ui/icons'
import './Delivery.scss'
import { useTranslations } from 'next-intl'
import DeliveryForm from './DeliveryForm/DeliveryForm'
import Courier from './DeliveryTabs/Courier'
import Pickup from './DeliveryTabs/Pickup'





const Delivery = () => {
	const tD = useTranslations('delivery')

	const tabs: ITab[] = [
		{
			title: tD('delivery'),
			content: <Courier />
		},
		{
			title: tD('pickup'),
			content: <Pickup />
		}
	]

	const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

	return (
		<div className='delivery'>
			<TabHead tabs={tabs} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
			<TabContent tabs={tabs} activeTabIndex={activeTabIndex} />
		</div>
	)
}

export default Delivery
