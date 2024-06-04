'use client'
import './MiddleBanner.scss'
import { useGetBannersQuery } from '@/store/api/home.api'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const MiddleBanner = () => {
	const { data, isLoading } = useGetBannersQuery({ bannerType: 'middle_banners' })
	const t = useTranslations('home')

	const pagination = {
		clickable: true,
		renderBullet: function (index: number, className: any) {
			return '<span class="' + className + '">' + (index + 1) + '</span>'
		}
	}

	return (
		<div className='middle-banner'>
			<Swiper
				slidesPerView={1}
				spaceBetween={15}
				loop={true}
				pagination={pagination}
				modules={[Pagination]}
				breakpoints={{
					1024: {
						slidesPerView: 1,
						spaceBetween: 15
					}
				}}
			>
				{data?.data.attributes.middle_banners?.map((el, index) => {
					return (
						<SwiperSlide>
							<div className='middle-banner__block'>
								<p className='middle-banner__text'>
									{index === 0 ? (
										t('cashBack')
									) : (
										<span>
											{t('fastDelivery')}
											<span className='middle-banner__text_highlight'>{t('hours')}</span>
										</span>
									)}
								</p>
								<Image
									src={el.banner.data.attributes.url}
									width={560}
									height={200}
									alt='middle Banner'
									className='middle-banner__image'
								/>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</div>
	)
}

export default MiddleBanner
