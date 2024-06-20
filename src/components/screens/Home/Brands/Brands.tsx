'use client'

import './Brands.scss'
import { useGetLogosQuery } from '@/store/api/productRTKQ.api'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { upperFirstLetter } from '@/utils/upperFirtLetter'
import { ILogoData } from '@/types/types'

const Brands = () => {
	const { data: logosData } = useGetLogosQuery({})
	const logosArray = logosData?.data.attributes.brandsLogo.data

	const { locale } = useParams()

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
					logosArray.map((item: ILogoData, index: number) => {
						const brandName = upperFirstLetter(item.attributes.name.replace('Logo.svg', ''))

							return (
								<Link key={index} href={`/${locale}/catalog?brand=${brandName}`}>
									<div className='brands__logos-item'>
										<Image
											alt='brand'
											src={item.attributes.url ? item.attributes.url : ''}
											width={175}
											height={80}
											//layout='fill'
											loading='lazy'
										/>
									</div>
								</Link>
							)
						}
					)}
			</div>
		</div>
	)
}

export default Brands
