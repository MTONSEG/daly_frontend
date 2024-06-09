'use client'
import './MainBanner.scss'
import Button from '@/components/ui/buttons/Button/Button'
import { LogoBanner } from '@/components/ui/icons'
import Carousel from '@/components/widgets/SliderThumbnail/SliderComp/Carousel'
import Fancybox from '@/components/widgets/SliderThumbnail/SliderComp/Fancybox'
import { useGetBannersQuery } from '@/store/api/home.api'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const MainBanner = () => {
	const { data } = useGetBannersQuery({ bannerType: 'hero_banners' })
	const t = useTranslations('home')

	return (
		<div className='main-banner'>
			<Fancybox
				options={{
					Carousel: {
						infinite: false,
						transition: 'fade'
					}
				}}
			>
				<Carousel options={{ Dots: true, Navigation: false }}>
					{data &&
						data.data.attributes.hero_banners &&
						data?.data.attributes.hero_banners.map((el, index) => (
							<div key={index} className='main-banner-slide f-carousel__slide'>
								<div className='main-banner-slide__text-wr'>
									<div style={{ display: 'flex' }}>
										<span className='main-banner-slide__text main-banner-slide__text_top'>
											{t('sales1')}
										</span>
										<LogoBanner />
									</div>
									<p className='main-banner-slide__text main-banner-slide__text_bottom'>
										{t('sales2')}
									</p>
									<Button className='main-banner-slide__btn' variant={'product'}>
										{t('about')}
									</Button>
								</div>

								<Image
									src={el.banner.data.attributes.url}
									fill
									alt='mainBanner'
									className='main-banner-slide__image'
									priority
								/>
							</div>
						))}
				</Carousel>
			</Fancybox>
		</div>
	)
}

export default MainBanner
