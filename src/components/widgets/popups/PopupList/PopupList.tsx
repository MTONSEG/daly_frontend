'use client'

import './PopupList.scss'
import { useState } from 'react'
import Image from 'next/image'
import arrow from '@/icons/leftArrow.webp'

interface PropsData {
	data?: Array<string>
}

const PopupList = (props: PropsData) => {
	return (
		<div className='popup-list'>
			{props.data?.map((item, index) => (
				<div className='popup-list__line' key={index}>
					<Image src={arrow} width={16} height={12} alt='arrow' />
					<p key={index}>{item}</p>
				</div>
			))}
		</div>
	)
}

export default PopupList
