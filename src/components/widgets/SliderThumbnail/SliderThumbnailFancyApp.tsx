import { FC, useState } from 'react'
import Image from 'next/image'
import './SliderThumbnail.scss'
import './SliderThumbnailFancyApp.scss'
import { IProductImage } from '@/types/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/controller'
import SwiperCore from 'swiper'
import { Controller } from 'swiper/modules'

// Initialize Swiper modules
SwiperCore.use([Controller])
const SliderThumbnailFancyApp: FC<{ images: IProductImage[] }> = ({ images }) => {
	const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null)
	console.log('🚀 ~ mainSwiper:', mainSwiper?.activeIndex)
	const [thumbSwiper, setThumbSwiper] = useState<SwiperCore | null>(null)
	console.log('🚀 ~ thumbSwiper:', thumbSwiper?.activeIndex)

	return (
		<div className='product-slider'>
			<Swiper
				className='product-slider__main-slider'
				slidesPerView={1}
				spaceBetween={25}
				initialSlide={0}
				slideToClickedSlide={true}
				onSwiper={setMainSwiper} // Set the main swiper instance
				controller={{ control: thumbSwiper }} // Sync with thumbnail swiper
			>
				{images.map((el, key) => (
					<SwiperSlide key={key} className='product-slider__main-slide'>
						<div className='product-slider__main-img-box'>
							<Image
								fill={true}
								src={el.url}
								alt='slider-big-img'
								className='product-slider__main-img'
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				className='product-slider__thumbnail-slider'
				slidesPerView={3}
				spaceBetween={25}
				initialSlide={0}
				centeredSlides={true}
				onSwiper={setThumbSwiper} // Set the thumbnail swiper instance
				slideToClickedSlide={true}
				controller={{ control: mainSwiper }} // Sync with main swiper
			>
				{images.map((el, key) => (
					<SwiperSlide key={key} className='product-slider__thumbnail-slide'>
						<Image
							fill={true}
							src={el.url}
							alt='slider-big-img'
							className='product-slider__thumbnail-img'
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default SliderThumbnailFancyApp
