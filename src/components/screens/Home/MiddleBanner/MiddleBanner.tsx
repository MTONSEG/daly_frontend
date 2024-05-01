'use client'
import { useGetBannersQuery } from '@/store/api/home.api'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect } from 'react'

const MiddleBanner = () => {
	const { data, isLoading } = useGetBannersQuery({ bannerType: 'middle_banners' })
	const t = useTranslations('home')

	useEffect(() => {
		console.log(data?.data.attributes.middle_banners)
	}, [data])

	if (isLoading) {
		return <div>...loading</div>
	}
	return (
		<div className='middleBanner'>
			{data?.data.attributes.middle_banners?.map((el, index) => {
				return (
					<div key={el.banner.data.attributes.url} className='middleBanner__block'>
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
						/>
					</div>
				)
			})}
		</div>
	)
}

export default MiddleBanner
