import Carousel from './SliderComp/Carousel'
import Fancybox from './SliderComp/Fancybox'
import Image from 'next/image'
import './SliderThumbnail.scss'
import { FC } from 'react'
import { IImage } from '@/types/types'

const SliderThumbnailFancyApp: FC<{ images: IImage[] }> = ({ images }) => {
	return (
		<div style={{ height: '570px' }} className='slider-wrapper'>
			<Fancybox
				options={{
					Carousel: {
						infinite: false,
						transition: 'fade'
					}
				}}
			>
				<Carousel
					options={{
						infinite: false,
						Navigation: false,
						fill: true,
						center: true,
						transition: 'fade',
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
					{images.map((el, index) => {
						return (
							<div
								key={index}
								className='f-carousel__slide slider__slide-wr slider__slide-wr_top'
								data-fancybox='gallery'
								data-src={el.url}
								data-thumb-src={el.url}
							>
								<Image alt='' src={el.url} width={370} height={300} />
							</div>
						)
					})}
				</Carousel>
			</Fancybox>
		</div>
	)
}

export default SliderThumbnailFancyApp
