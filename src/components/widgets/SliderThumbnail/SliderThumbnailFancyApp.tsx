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
import useOutsideClick from '@/hooks/useOutSideClick'

// Initialize Swiper modules
SwiperCore.use([Controller])
const SliderThumbnailFancyApp: FC<{ images: IProductImage[] }> = ({ images }) => {
	const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null)
	const [thumbSwiper, setThumbSwiper] = useState<SwiperCore | null>(null)
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)

	return (
		<div className='product-slider'>
			<div className='product-slider__slider-placeholder'></div>
			<div className={`product-slider__popup-wrapper ${isActive && 'active'}`}>
				<div className={`product-slider__popup-container ${isActive && 'active'}`} ref={ref}>
					<Swiper
						className={`product-slider__main-slider ${isActive && 'active'}`}
						slidesPerView={1}
						spaceBetween={25}
						initialSlide={0}
						slideToClickedSlide={true}
						onSwiper={setMainSwiper} // Set the main swiper instance
						controller={{ control: thumbSwiper }} // Sync with thumbnail swiper
					>
						{images.map((el, key) => (
							<SwiperSlide
								key={key}
								className={`product-slider__main-slide ${isActive && 'active'}`}
							>
								<div
									className='product-slider__main-img-box'
									onClick={() => {
										setIsActive(true)
									}}
								>
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
						className={`product-slider__thumbnail-slider ${isActive && 'active'}`}
						slidesPerView={3}
						spaceBetween={25}
						initialSlide={0}
						centeredSlides={true}
						onSwiper={setThumbSwiper} // Set the thumbnail swiper instance
						slideToClickedSlide={true}
						controller={{ control: mainSwiper }} // Sync with main swiper
					>
						{images.map((el, key) => (
							<SwiperSlide
								key={key}
								className={`product-slider__thumbnail-slide ${isActive && 'active'}`}
							>
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
			</div>
		</div>
	)
}

export default SliderThumbnailFancyApp
