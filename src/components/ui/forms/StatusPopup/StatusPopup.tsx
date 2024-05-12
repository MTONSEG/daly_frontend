import React, { useEffect } from 'react'
import './StatusPopup.scss'
import Button from '@/components/ui/buttons/Button/Button'
import { useTranslations } from 'next-intl'

interface StatusPopupProps {
	status: 'waiting' | 'idle' | 'success' | 'failed'
	onClose: () => void
}

const StatusPopup: React.FC<StatusPopupProps> = ({ status, onClose }) => {
	const w = useTranslations('status-popup')
	let message = ''
	useEffect(() => {
		const bodyClassList = document.body.classList
		if (status === 'idle') {
			bodyClassList.remove('popup-is-active')
		} else {
			bodyClassList.add('popup-is-active')
		}
	}, [status])
	switch (status) {
		case 'waiting':
			message = w('waiting-text')
			break
		case 'idle':
			return null
		case 'success':
			message = w('success-text')

			break
		case 'failed':
			message = w('failed-text')
			break
		default:
			break
	}

	return (
		<div className={`status-popup ${status}`}>
			<div className='status-popup__box'>
				<p className='status-popup__popup-text'>{message}</p>
				<Button className='status-popup__button' onClick={onClose}>
					Close
				</Button>
			</div>
		</div>
	)
}

export default StatusPopup
