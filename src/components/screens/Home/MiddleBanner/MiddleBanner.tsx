'use client'
import { useGetBannersQuery } from '@/store/api/home.api'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useMatchMedia } from '@/hooks/use-match-media'

const MiddleBanner = () => {
	const { data, isLoading } = useGetBannersQuery({ bannerType: 'middle_banners' })
	const t = useTranslations('home')

	const screenWidth = useMatchMedia()

	const [hovered, setHovered] = useState<boolean>(false)
	const handleMouseEnter = () => setHovered(true)
	const handleMouseLeave = () => setHovered(false)

	return (
		<div className='middleBanner'>
			{data?.data.attributes.middle_banners?.map((el, index) => {
				return (
					<div
						key={el.banner.data.attributes.url}
						className='middleBanner__block'
						onMouseEnter={!screenWidth.isDesktop ? handleMouseEnter : undefined}
						onMouseLeave={!screenWidth.isDesktop ? handleMouseLeave : undefined}
					>
						<p className='middleBanner__text'>
							{index === 0 ? (
								t('cashBack')
							) : (
								<span>
									{t('fastDelivery')}
									<span className='highlight'>{t('hours')}</span>
								</span>
							)}
						</p>
						<Image
							src={el.banner.data.attributes.url}
							width={560}
							height={200}
							alt='middle Banner'
							className={
								hovered && !screenWidth.isDesktop && index === 1 ? 'middleBanner__image middleBanner__image--hovered' : 'middleBanner__image'
							}
							style={{ display: index === 1 && screenWidth.isMobile && !hovered ? 'none' : 'block' }}
						/>
					</div>
				)
			})}
		</div>
	)
}

export default MiddleBanner
