'use client'
import { ArrowLeft } from '@/components/ui/icons'
import { useTranslations } from 'next-intl'

const OrderTitle = () => {
	const word = useTranslations('order')

	const handleGoBack = () => {
		window.history.back()
	}

	return (
		<button className='order__title' onClick={handleGoBack}>
			<ArrowLeft className='order__title-arrow' />
			{word('title')}
		</button>
	)
}

export default OrderTitle
