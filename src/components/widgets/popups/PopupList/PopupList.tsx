'use client'

import './PopupList.scss'
import { CloseSign } from '@/components/ui/icons'

interface PropsData {
	data?: Array<string>
	close?: () => void
	getValue?: (e: string) => void
}

const PopupList = (props: PropsData) => {
	
	return (
		<div className='popup-list'>
			<div className='popup-list__body'>
				{props.data?.map((item, index) => (
					<div className='popup-list__line' onClick={() => {props.getValue?.(item); props.close?.()}}
					>
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
