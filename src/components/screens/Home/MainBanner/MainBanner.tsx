'use client'
import Button from '@/components/ui/buttons/Button/Button'
import { LogoBanner } from '@/components/ui/icons'
import Carousel from '@/components/widgets/SliderThumbnail/SliderComp/Carousel'
import Fancybox from '@/components/widgets/SliderThumbnail/SliderComp/Fancybox'
import { useGetBannersQuery } from '@/store/api/home.api'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const MainBanner = () => {
	const { data, isLoading } = useGetBannersQuery({ bannerType: 'hero_banners' })
	const t = useTranslations('home')

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
								<div style={{ display: 'flex' }}>
									<span className='mainBanner-slide__text mainBanner-slide__text_top'>
										{t('sales1')}
									</span>
									<LogoBanner />
								</div>
								<p className='mainBanner-slide__text mainBanner-slide__text_bottom'>
									{t('sales2')}
								</p>
								<Button className='mainBanner-slide__btn' variant={'product'}>
									{t('about')}
								</Button>
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
