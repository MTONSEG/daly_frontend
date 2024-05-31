'use client'

import "./BottomBanner.scss"
import Button from '@/components/ui/buttons/Button/Button'
import Carousel from '@/components/widgets/SliderThumbnail/SliderComp/Carousel'
import Fancybox from '@/components/widgets/SliderThumbnail/SliderComp/Fancybox'
import { useGetBannersQuery } from '@/store/api/home.api'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const BottomBanner = () => {
	const { data, isLoading } = useGetBannersQuery({ bannerType: 'bottom_bunners' })
	const t = useTranslations('home')

	
	if (isLoading) {
		return <div>...loading</div>
	}
	return (
		<div className='bottom-banner'>
			<Fancybox
				options={{
					Carousel: {
						infinite: true,
						Navigation: true,
						transition: 'fade'
					}
				}}
			>
				<Carousel>
					{data &&
						data.data.attributes.bottom_bunners &&
						data?.data.attributes.bottom_bunners.map((el, index) => (
							<div key={index} className='bottom-banner-slide f-carousel__slide'>
								<div className='bottom-banner-slide__text-wr'>
									<h1 className='bottom-banner-slide__title'>Новый IPhon 12</h1>
									<p className='bottom-banner-slide__text'>Теперь в новых цветах</p>
									<p className='bottom-banner-slide__text2'>уже в продаже</p>
									<Button className='bottom-banner-slide__btn' variant={'product'}>
										{t('about')}
									</Button>
								</div>

								<Image
									src={el.banner.data.attributes.url}
									width={643}
									height={285}
									alt='bottomBanner'
									className='bottom-banner-slide__image'
								/>
							</div>
						))}
				</Carousel>
			</Fancybox>
		</div>
	)
}

export default BottomBanner
