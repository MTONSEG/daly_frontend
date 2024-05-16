'use client'

import '../Home.scss'
import { useTranslations } from 'next-intl'
import SubscribeForm from './SubscribeForm'

const Subscribe = () => {
	const word = useTranslations('subscribe')

	return (
		<div className='subscribe'>
			<div className='subscribe__container'>
				<div className='subscribe__grid'>
					<div className='subscribe__description'>
						<h3 className='subscribe__description-title'>{word('main-title')}</h3>
						<p className='subscribe__description-text'>{word('description')}</p>
					</div>
					<SubscribeForm />
				</div>
			</div>
		</div>
	)
}

export default Subscribe
