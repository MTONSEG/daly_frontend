'use client'

import './PopupList.scss'
import { useState } from 'react'
import Image from 'next/image'
import arrow from '@/icons/leftArrow.webp'
import { CloseSign } from '@/components/ui/icons'

interface PropsData {
	data?: Array<string>
	close?: () => void
}

const PopupList = (props: PropsData) => {
	return (
		<div className='popup-list'>
			<div className='popup-list__body'>
				{props.data?.map((item, index) => (
					<div className='popup-list__line'>
						<Image src={arrow} width={16} height={12} alt='arrow' />
						<p key={index}>{item}</p>
					</div>
				))}
				<div className='popup-list__close' onClick={props.close}>
					<CloseSign />
				</div>
			</div>
		</div>
	)
}

export default PopupList
