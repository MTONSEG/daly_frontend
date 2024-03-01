'use client'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState, useEffect, useRef, FC } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import phoneBig from '@/images/SliderTest/phoneBig.png'
import phone1 from '@/images/SliderTest/phone1.png'
import phone2 from '@/images/SliderTest/phone2.png'
import phone3 from '@/images/SliderTest/phone3.png'
import './SliderThumbnail.scss'
import Container from '@/components/ui/containers/Container/Container'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface ISliderThumbnail {
	images: (string | StaticImport)[]
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
				>
					<div className='slider__slide-wr slider__slide-wr_top'>
						<div className='slider__slide'>
							<Image alt='test' src={phoneBig} />
						</div>
					</div>
					<div className='slider__slide-wr slider__slide-wr_top'>
						<div className='slider__slide'>
							<Image alt='test' src={phone2} />
						</div>
					</div>
					<div className='slider__slide-wr slider__slide-wr_top'>
						<div className='slider__slide'>
							<Image alt='test' src={phone3} />
						</div>
					</div>
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
					<div className='slider__slide-wr slider__slide-wr_bottom'>
						<Image alt='test' src={phoneBig} />
					</div>
					<div className='slider__slide-wr slider__slide-wr_bottom'>
						<Image alt='test' src={phone2} />
					</div>
					<div className='slider__slide-wr slider__slide-wr_bottom'>
						<Image alt='test' src={phone3} />
					</div>
				</Slider>
			</div>
		</Container>
	)
}

export default SliderThumbNail
