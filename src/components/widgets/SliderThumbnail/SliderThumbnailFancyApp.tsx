import { FC, useState } from 'react'
import { useRef } from 'react'
import Image from 'next/image'
import './SliderThumbnail.scss'
import './SliderThumbnailFancyApp.scss'
import { IProductImage } from '@/types/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/controller'
import SwiperCore from 'swiper'
import { Controller } from 'swiper/modules'
import useOutsideClick from '@/hooks/useOutSideClick'
import ClosePopup from '@/components/ui/Buttons/ClosePopup/ClosePopup'

// Initialize Swiper modules
SwiperCore.use([Controller])
const SliderThumbnailFancyApp: FC<{ images: IProductImage[] }> = ({ images }) => {
	const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null)
	const [thumbSwiper, setThumbSwiper] = useState<SwiperCore | null>(null)
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)
	const prevRef = useRef(null)
	const nextRef = useRef(null)

	return (
		<div className='product-slider'>
			<div className='product-slider__slider-placeholder'></div>

			<div className={`product-slider__popup-wrapper ${isActive && 'active'}`}>
				<div style={{ position: 'relative' }}>
					<div className={`product-slider__popup-container ${isActive && 'active'}`} ref={ref}>
						<Swiper
							className={`product-slider__main-slider ${isActive && 'active'}`}
							slidesPerView={1}
							spaceBetween={25}
							initialSlide={0}
							slideToClickedSlide={true}
							onSwiper={setMainSwiper} // Set the main swiper instance
							controller={{ control: thumbSwiper }} // Sync with thumbnail swiper
							modules={[Navigation]}
							navigation={{
								prevEl: prevRef.current,
								nextEl: nextRef.current
							}}
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
							<div className={isActive ? 'swiper-buttons-wrapper' : 'swiper-buttons-wrapper_none'}>
								<button ref={prevRef} className='swiper-button-prev'></button>
								<button ref={nextRef} className='swiper-button-next'></button>
							</div>
						

						<Swiper
							className={`product-slider__thumbnail-slider ${isActive && 'active'}`}
							slidesPerView={3}
							spaceBetween={20}
							initialSlide={0}
							centeredSlides={false}
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

				{isActive && (
					<ClosePopup
						closeWindow={() => setIsActive(false)}
						className={'product-slider__close-popup'}
					/>
				)}
			</div>

			<div className={isActive ? 'product-slider__overlay' : ''}></div>
		</div>
	)
}

export default SliderThumbnailFancyApp
