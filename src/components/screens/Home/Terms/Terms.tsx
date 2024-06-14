"use client"
import './Terms.scss'
import { useGetTermsQuery } from '@/store/api/productRTKQ.api'
import Image from 'next/image'
import noImage from "@/images/image-break.png"
import { ITerm } from '@/types/types'
import { useParams } from 'next/navigation'

const Terms = () => {
	const { locale } = useParams()
	const { data: termsData } = useGetTermsQuery({locale})
	const dataArray = termsData?.data.attributes.terms

	return (
		<div className='main-terms'>
			{dataArray && dataArray.map((item: ITerm, index: number) => (
				<div className='main-terms__item' key={index}>
					<h3 className='main-terms__item-title' key={index}>
						{item.title}
					</h3>
					<Image
						src={dataArray ? dataArray[index].image.data.attributes.url : noImage}
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
