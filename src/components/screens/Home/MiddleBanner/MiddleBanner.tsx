'use client'
import './MiddleBanner.scss'
import { useGetBannersQuery } from '@/store/api/home.api'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const MiddleBanner = () => {
	const { data } = useGetBannersQuery({ bannerType: 'middle_banners' })
	const t = useTranslations('home')
	const duplicatedBanners = data ? Array(4).fill(data.data.attributes.middle_banners).flat() : []

	const pagination = {
		clickable: true,
		renderBullet: function (index: number, className: string) {
			return '<span class="' + className + '">' + (index + 1) + '</span>'
		}
	}

	return (
		<div className='middle-banner'>
			<Swiper
				slidesPerView={1}
				spaceBetween={15}
				loop={false}
				pagination={pagination}
				modules={[Pagination, Autoplay]}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true
				}}
				breakpoints={{
					1024: {
						slidesPerView: 1,
						spaceBetween: 15,
						autoplay: false
					},
					0: {
						slidesPerView: 1,
						spaceBetween: 15,
						autoplay: {
							delay: 3000,
							disableOnInteraction: false,
							pauseOnMouseEnter: true
						}
					}
				}}
			>
				{duplicatedBanners.map((el, index) => {
					return (
						<SwiperSlide key={index}>
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
