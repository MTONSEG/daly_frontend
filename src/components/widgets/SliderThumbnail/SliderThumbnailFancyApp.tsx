import * as React from 'react'

import Carousel from './SliderComp/Carousel'
import Fancybox from './SliderComp/Fancybox'

import Image from 'next/image'

import phone from '@/images/SliderTest/phoneBig.png'

import './SliderThumbnail.scss'

// import './style.css'

export default function App() {
	return (
		<div>
			<Fancybox
				options={{
					Carousel: {
						infinite: false
					}
				}}
			>
				<Carousel
					options={{
						infinite: false,
						Navigation: false,
						fill: true,
						center: true,
						classes: {
							container: 'slider'
						},
						breakpoints: {
							'(max-width: 375px)': {
								Thumbs: false,
								Dots: true
							}
						}
					}}
				>
					<div
						className='f-carousel__slide slider__slide-wr slider__slide-wr_top'
						data-fancybox='gallery'
					>
						<Image alt='' src={phone} width={200} height={100} />
					</div>
					<div
						className=' f-carousel__slide slider__slide-wr slider__slide-wr_top'
						data-fancybox='gallery'
						data-src='https://lipsum.app/id/61/1600x1200'
						data-thumb-src='https://lipsum.app/id/61/200x150'
					>
						<Image alt='' src={phone} width={200} height={100} />
					</div>
					<div
						className=' f-carousel__slide slider__slide-wr slider__slide-wr_top'
						data-fancybox='gallery'
						data-src='https://lipsum.app/id/62/1600x1200'
						data-thumb-src='https://lipsum.app/id/62/200x150'
					>
						<Image alt='' src={phone} width={200} height={100} />
					</div>
					<div
						className=' f-carousel__slide slider__slide-wr slider__slide-wr_top'
						data-fancybox='gallery'
						data-src='https://lipsum.app/id/63/1600x1200'
						data-thumb-src='https://lipsum.app/id/63/200x150'
					>
						<Image alt='' src={phone} width={200} height={100} />
					</div>
					<div
						className=' f-carousel__slide slider__slide-wr slider__slide-wr_top'
						data-fancybox='gallery'
						data-src='https://lipsum.app/id/64/1600x1200'
						data-thumb-src='https://lipsum.app/id/64/200x150'
					>
						<Image alt='' src={phone} width={200} height={100} />
					</div>
				</Carousel>
			</Fancybox>
		</div>
	)
}
