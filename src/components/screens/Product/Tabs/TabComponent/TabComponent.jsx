import React, { useEffect, useState } from 'react'
import './TabComponent.scss'
import { motion } from 'framer-motion'

const TabComponent = ({ tabs, defaultIndex = 0 }) => {
	const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex)

	const onTabClick = (index) => {
		setActiveTabIndex(index)
	}

	const tabVariant = {
		active: {
			opacity: 1,
			transition: {
				duration: 1
			}
		},
		inactive: {
			opacity: 0.5,
			transition: {
				duration: 1
			}
		}
	}

	const tabContentVariant = {
		active: {
			display: 'block',
			transition: {
				staggerChildren: 0.2
			}
		},
		inactive: {
			display: 'none',
			transition: {
				duration: 0.3
			}
		}
	}

	const cardVariant = {
		active: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.5
			}
		},
		inactive: {
			opacity: 0,
			x: 10,
			transition: {
				duration: 0.5
			}
		}
	}

	return (
		<>
			<ul className='tabs__btns-wr' role='tablist'>
				{tabs.map((tab, index) => (
					<motion.li
						key={tab.id}
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
			{tabs.map((tab, index) => (
				<motion.div
					variants={cardVariant}
					role='tabpanel'
					id={tab.id}
					key={tab.id}
					className={`tab-content ${activeTabIndex === index ? 'active' : ''}`}
					animate={`${activeTabIndex === index ? 'active' : 'inactive'}`}
				>
					{tab.content}
				</motion.div>
			))}
		</>
	)
}

export default TabComponent
