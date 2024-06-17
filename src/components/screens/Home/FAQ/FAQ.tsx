'use client'

import '../Home.scss'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowDropDown } from '@/components/ui/icons'

const Faq = () => {
	const word = useTranslations('faq')
    const [showMore, setShowMore] = useState<boolean>(false)

	return (
		<div className='faq'>
			<h3 className='faq__title'>{word('title')}</h3>
			<div className='faq__text-wrapper'>
				<p className='faq__text'>{word('text')}</p>{' '}
				{showMore && <p className='faq__text faq__text-transition'>{word('text')}</p>}
			</div>
			<div className='faq__open' onClick={() => setShowMore(!showMore)}>
				<p className='faq__open-text'>{word('open-text')}</p>
				<ArrowDropDown className={showMore ? 'faq__open-arrow' : ''} style={{width:"12px",height:"12px"}}/>
				
			</div>
		</div>
	)
}

export default Faq
