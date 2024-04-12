'use client'
import { useGetBannersQuery } from '@/store/api/home.api'
import { useEffect } from 'react'

const MainBanner = () => {
	const { data, isLoading } = useGetBannersQuery({ bannerType: 'hero_banners' })

	useEffect(() => {
		console.log(data, data?.data.attributes.hero_banners[0].banner.data.attributes.url)
	}, [isLoading, data])

	return <div>mainBanner</div>
}

export default MainBanner
