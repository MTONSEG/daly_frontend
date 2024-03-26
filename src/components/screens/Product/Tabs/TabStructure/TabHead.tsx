import React, { Dispatch, FC, SetStateAction } from 'react'
import { tabVariant } from './variants'
import { ITab } from '../Tabs'
import { motion } from 'framer-motion'

interface ITabHead {
	tabs: ITab[]
	activeTabIndex: number
	setActiveTabIndex: Dispatch<SetStateAction<number>>
}

const TabHead: FC<ITabHead> = ({ tabs, activeTabIndex, setActiveTabIndex }) => {
	const onTabClick = (index: number) => {
		setActiveTabIndex(index)
	}

	return (
		<ul className='tabs__btns-wr' role='tablist'>
			{tabs.map((tab, index) => (
				<motion.li
					key={index}
					className={`tabs__li ${activeTabIndex === index ? 'active' : ''}`}
					role='presentation'
					onClick={() => onTabClick(index)}
					variants={tabVariant}
					animate={activeTabIndex === index ? 'active' : 'inactive'}
				>
					{tab.title}
				</motion.li>
			))}
		</ul>
	)
}

export default TabHead
