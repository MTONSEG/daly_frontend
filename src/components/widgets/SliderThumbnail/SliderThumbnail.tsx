'use client'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState, useEffect, useRef, FC } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import './SliderThumbnail.scss'
import Container from '@/components/ui/containers/Container/Container'

interface ISliderThumbnail {
	images: IImage[]
}

const SliderThumbNail: FC<ISliderThumbnail> = ({ images }) => {
	const [nav1, setNav1] = useState<React.MutableRefObject<null> | null | Slider | undefined>(null)
	const [nav2, setNav2] = useState<React.MutableRefObject<null> | null | Slider | undefined>(null)
	const sliderRef1 = useRef(null)
	const sliderRef2 = useRef(null)

	useEffect(() => {
		setNav1(sliderRef1.current)
		setNav2(sliderRef2.current)
	}, [])

	return (
		<Container variant='default'>
			<div className='slider-container'>
				<Slider
					className='slider__top'
					arrows={false}
					asNavFor={nav2 instanceof Slider ? nav2 : undefined}
					ref={sliderRef1}
					responsive={[{ breakpoint: 374, settings: { dots: true } }]}
					infinite={false}
				>
					{images.map((el, index) => {
						return (
							<div key={index} className='slider__slide-wr slider__slide-wr_top'>
								<div className='slider__slide'>
									<Image alt='test' width={370} height={200} src={el.url} />
								</div>
							</div>
						)
					})}
				</Slider>
				<Slider
					className='slider__bottom'
					slidesToShow={3}
					swipeToSlide={true}
					focusOnSelect={true}
					asNavFor={nav1 instanceof Slider ? nav1 : undefined}
					arrows={false}
					ref={sliderRef2}
					infinite={false}
				>
					{images.map((el, index) => {
						return (
							<div key={index} className='slider__slide-wr slider__slide-wr_bottom'>
								<div className='slider__slide'>
									<Image alt='test' height={90} width={90} src={el.url} />
								</div>
							</div>
						)
					})}
				</Slider>
			</div>
		</Container>
	)
}

export default SliderThumbNail
