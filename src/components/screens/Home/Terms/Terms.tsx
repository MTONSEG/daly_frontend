'use client'

import '../Home.scss'
import { useGetTermsQuery } from '@/store/api/productRTKQ.api'
import Image from 'next/image'

const Terms = () => {
	const titles: Array<string | JSX.Element> = [
		'Удобная доставка',
		<span>Оплата любым<br />способом</span>,
		<span>Гарантийное<br />обслуживание</span>,
		<span>Быстрый обмен<br />и возврат</span>,
		'Экспресс доставка',
		'Выгодные цены'
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
                  style={{objectFit: "cover"}}
					/>
				</div>
			))}
		</div>
	)
}

export default Terms
