'use client'
import { LogoBanner } from '@/components/ui/icons'
import Carousel from '@/components/widgets/SliderThumbnail/SliderComp/Carousel'
import Fancybox from '@/components/widgets/SliderThumbnail/SliderComp/Fancybox'
import { useGetBannersQuery } from '@/store/api/home.api'
import Image from 'next/image'
import { useEffect } from 'react'
import Slider from 'react-slick'

const MainBanner = () => {
	const { data, isLoading } = useGetBannersQuery({ bannerType: 'hero_banners' })

	useEffect(() => {
		console.log(data, data?.data.attributes.hero_banners[0].banner.data.attributes.url)
	}, [isLoading, data])

	if (isLoading) {
		return <div>...loading</div>
	}
	return (
		<div className='mainBanner'>
			<Fancybox
				options={{
					Carousel: {
						infinite: false,
						transition: 'fade'
					}
				}}
			>
				<Carousel options={{ Dots: true, Navigation: false }}>
					{data?.data.attributes.hero_banners.map((el, index) => (
						<div
							key={index}
							className='mainBanner-slide f-carousel__slide slider__slide-w'
							data-src={el.banner.data.attributes.url}
						>
							<div className='mainBanner-slide__text-wr'>
								<span className='mainBanner-slide__text mainBanner-slide__text_top'>Скидки от</span>
								<LogoBanner />
								<br />
								<span className='mainBanner-slide__text mainBanner-slide__text_bottom'>
									На смартфоны Samsung
								</span>
							</div>
							<Image
								src={el.banner.data.attributes.url}
								fill
								alt='mainBanner'
								className='mainBanner-slide__image'
							/>
						</div>
					))}
				</Carousel>
			</Fancybox>
		</div>
	)
}

export default MainBanner
