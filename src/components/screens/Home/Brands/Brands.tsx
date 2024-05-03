"use client"

import '../Home.scss'
import { useGetLogosQuery } from '@/store/api/productRTKQ.api'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const Brands = () => {
	const { data: logosData } = useGetLogosQuery({})
	const logosArray = logosData?.data.attributes.brandsLogo.data

    const t = useTranslations('home')

	return (
		<div className='brands'>
            <div className='product-line__top'>
				<h2 className='product-line__title'>Популярные бренды</h2>
				<LinkBtn className='product-line__text' href='/catalog'>
					{t('seeAll')}
				</LinkBtn>
			</div>
			<div className={'brands__logos'}>
				{logosArray &&
					logosArray.map((item: any, index: number) => (
						<div key={index} style={{ width: '175px' }}>
							<Image
								alt='brand'
								src={item.attributes.url ? item.attributes.url : ''}
								width={175}
								height={80}
								style={{ minWidth: '100%', objectFit: 'cover' }}
							/>
						</div>
					))}
			</div>
		</div>
	)
}

export default Brands
