'use client'

import '../../../widgets/SliderThumbnail/SliderThumbnail.scss'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { useGetProductsByTagQuery } from '@/store/api/productRTKQ.api'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import './ProductLine.scss'

interface IProductLine {
	title: string
	tag: 'hit'
	tagValue: boolean
	pageNum?: number
	sort?: string
	brands?: boolean
	logos?: boolean
	sortingOption?: 'publishedAt' | 'price' | 'rating'
	isDiscount?: boolean
}

// SwiperCore.use([Navigation, Pagination])

const ProductLine: FC<IProductLine> = ({
	title,
	tag,
	tagValue,
	pageNum,
	brands,
	logos,
	sortingOption,
	isDiscount
}) => {
	const { data } = useGetProductsByTagQuery({ tag: tag, tagValue: tagValue, pageNum: pageNum })
	console.log("🚀 ~ data:", data)
	const catalogHref = sortingOption
		? `/catalog?sorting=${sortingOption}`
		: isDiscount
		? `/catalog?isDiscount=${isDiscount}`
		: '/catalog'
	const t = useTranslations('home')

	const { locale } = useParams()

	return (
		<div className='product-line'>
			<div className='product-line__top'>
				<h2 className='product-line__title'>{title}</h2>
				<LinkBtn className='product-line__text' href={catalogHref}>
					{t('seeAll')}
				</LinkBtn>
			</div>
			<div className='product-line__bottom'>
				<div className='product-line__slider-container'>
					<Swiper
						slidesPerView={5}
						spaceBetween={25}
						loop={true}
						navigation
						pagination={{ clickable: true }}
						breakpoints={{
							1440: {
								slidesPerView: 5,
								spaceBetween: 25
							},
							1024: {
								slidesPerView: 4,
								spaceBetween: 25
							},
							762: {
								slidesPerView: 3,
								spaceBetween: 25
							},
							576: {
								slidesPerView: 2,
								spaceBetween: 10
							},
							375: {
								slidesPerView: 1,
								spaceBetween: 5,
								centeredSlides: true
							},
							275: {
								slidesPerView: 1,
								spaceBetween: 5,
								centeredSlides: true
							}
						}}
					>
						{!brands
							? data
								? data.data.map((el, key) => (
										<SwiperSlide key={key}>
											<div className='product-line__slide-content'>
												<ProductCard product={el} variant='card' locale={'ru'} />
											</div>
										</SwiperSlide>
								  ))
								: Array.from({ length: 12 }).map((_, index) => (
										<SwiperSlide key={index}>
											<ProductCard variant={'card'} locale={locale} />
										</SwiperSlide>
								  ))
							: data?.data.map((el, index) => {
									if (el.attributes.images) {
										return (
											<SwiperSlide key={index}>
												<div style={{ width: '175px' }}>
													<Image fill alt='brand' src={el.attributes.images[index].url} />
												</div>
											</SwiperSlide>
										)
									}
									return null
							  })}
					</Swiper>
				</div>
			</div>
		</div>
	)
}

export default ProductLine
