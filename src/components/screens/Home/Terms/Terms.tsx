'use client'

import '../Home.scss'
import { useGetTermsQuery } from '@/store/api/productRTKQ.api'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const Terms = () => {
	const word = useTranslations('terms')
	const titles: Array<string | JSX.Element> = [
		<span>{word("title-1")}</span>,
		<span>{word("title-2")}</span>,
		<span>{word("title-3")}</span>,
		<span>{word("title-4")}</span>,
		<span>{word("title-5")}</span>,
		<span>{word("title-6")}</span>,
	]
	const { data: termsData } = useGetTermsQuery({})
	const termsArray = termsData?.data.attributes.termsImage.data

	return (
		<div className='main-terms'>
			{titles.map((item, index) => (
				<div className='main-terms__item'>
					<h3 className='main-terms__item-title' key={index}>
						{item}
					</h3>
					<Image
						src={termsArray ? termsArray[index].attributes.url : ''}
						width={65}
						height={65}
						alt='icon'
						style={{ objectFit: 'cover' }}
						loading='lazy'
					/>
				</div>
			))}
		</div>
	)
}

export default Terms
