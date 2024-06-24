import React, { FC } from 'react'
import '../Tabs.scss'
import { cardVariant } from './variants'
import { ITab } from '../Tabs'
import { motion } from 'framer-motion'

interface ITabContent {
	tabs: ITab[]
	activeTabIndex: number
}

const TabContent: FC<ITabContent> = ({ tabs, activeTabIndex }) => {
	
	return (
		<div className='tab__content-wr'>
			{tabs.map((tab, index) => (
				<motion.div
					variants={cardVariant}
					role='tabpanel'
					key={index}
					className={`tab-content ${activeTabIndex === index ? 'active' : ''}`}
					animate={`${activeTabIndex === index ? 'active' : 'inactive'}`}
				>
					{tab.content}
				</motion.div>
			))}
		</div>
	)
}

export default TabContent
