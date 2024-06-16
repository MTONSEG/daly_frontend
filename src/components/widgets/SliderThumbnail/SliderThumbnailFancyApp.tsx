import { FC, useState, useRef, useEffect } from 'react'
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
import useOutsideClick from '@/hooks/useOutSideClick'
import ClosePopup from '@/components/ui/Buttons/ClosePopup/ClosePopup'

// Initialize Swiper modules
SwiperCore.use([Navigation])

const SliderThumbnailFancyApp: FC<{ images: IProductImage[] }> = ({ images }) => {
	const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null)
	const [thumbSwiper, setThumbSwiper] = useState<SwiperCore | null>(null)
	const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0) // State to track active thumbnail
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)
	const prevRef = useRef<HTMLButtonElement | null>(null)
	const nextRef = useRef<HTMLButtonElement | null>(null)

	useEffect(() => {
		if (isActive) {
			document.body.classList.add('open')
		} else {
			document.body.classList.remove('open')
		}
	}, [isActive])

	const handleThumbnailClick = (index: number) => {
		setActiveThumbnailIndex(index) // Update active thumbnail index
		if (mainSwiper) {
			mainSwiper.slideTo(index)
		}
	}

	const handleSlideChange = () => {
		if (mainSwiper) {
			setActiveThumbnailIndex(mainSwiper.activeIndex) // Update active thumbnail index on slide change
		}
	}

	// Update Swiper instances on resize
	useEffect(() => {
		const handleResize = () => {
			if (thumbSwiper) {
				thumbSwiper.update()
			}
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [thumbSwiper])

	return (
		<div className='product-slider'>
			<div className={`product-slider__slider-placeholder ${isActive && 'active'}`}></div>

			<div className={`product-slider__popup-wrapper ${isActive && 'active'}`}>
				{isActive && (
					<ClosePopup
						closeWindow={() => setIsActive(false)}
						className={'product-slider__close-popup'}
					/>
				)}
				<div className={`product-slider__popup-container ${isActive && 'active'}`} ref={ref}>
					<Swiper
						className={`product-slider__main-slider ${isActive && 'active'}`}
						slidesPerView={1}
						spaceBetween={25}
						initialSlide={0}
						slideToClickedSlide={true}
						centeredSlides={true}
						onSwiper={setMainSwiper} // Set the main swiper instance
						onSlideChange={handleSlideChange} // Listen to slide change event
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
										sizes='100%'
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					<div className={`product-slider__buttons-wrapper ${isActive && 'active'}`}>
						<button ref={prevRef} className='swiper-button-prev'></button>
						<button ref={nextRef} className='swiper-button-next'></button>
					</div>

					<Swiper
						className={`product-slider__thumbnail-slider ${isActive && 'active'}`}
						slidesPerView={isActive ? 5 : 3}
						spaceBetween={25}
						initialSlide={0}
						centeredSlides={false}
						onSwiper={setThumbSwiper} // Set the thumbnail swiper instance
						breakpoints={{
							1440: {
								slidesPerView: isActive ? 5 : 3,
								spaceBetween: 25
							},
							1024: {
								slidesPerView: isActive ? 5 : 3,
								spaceBetween: 25
							},
							762: {
								slidesPerView: isActive ? 4 : 3,
								spaceBetween: 25
							},
							576: {
								slidesPerView: isActive ? 3 : 2,
								spaceBetween: 20
							},
							375: {
								slidesPerView: isActive ? 2 : 2,
								spaceBetween: 18
							},
							275: {
								slidesPerView: 2,
								spaceBetween: 15
							}
						}}
					>
						{images.map((el, key) => (
							<SwiperSlide
								key={key}
								className={`product-slider__thumbnail-slide ${isActive && 'active'} ${
									key === activeThumbnailIndex ? 'chosen' : ''
								}`}
								onClick={() => handleThumbnailClick(key)} // Handle click to slide main swiper
							>
								<Image
									fill={true}
									sizes='100%'
									src={el.url}
									alt='slider-big-img'
									className='product-slider__thumbnail-img'
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>

			<div className={isActive ? 'product-slider__overlay' : ''}></div>
		</div>
	)
}

export default SliderThumbnailFancyApp
