'use client'

import './ProductLine.scss'
import '../../../widgets/SliderThumbnail/SliderThumbnail.scss'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { useGetProductsByTagQuery } from '@/store/api/productRTKQ.api'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Loader from '@/components/ui/loaders/Loader'


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

const ProductLine: FC<IProductLine> = ({
	title,
	tag,
	tagValue,
	pageNum,
	brands,
	sortingOption,
	isDiscount,
}) => {
	const { locale } = useParams()
	const { data } = useGetProductsByTagQuery({
		tag: tag,
		tagValue: tagValue,
		pageNum: pageNum,
		locale: locale
	})
	const catalogHref = sortingOption
		? `/catalog?sorting=${sortingOption}`
		: isDiscount
		? `/catalog?isDiscount=${isDiscount}`
		: '/catalog'
	const t = useTranslations('home')

	const pagination = {
		clickable: true,
		renderBullet: function (index: number, className: string) {
			return '<span class="' + className + '">' + '</span>'
		}
	}
	const [loading, setIsLoading] = useState<boolean>(false)
	const handleLoader = () => {
		setIsLoading(true)
	}
  
	return (
		<div className='product-line'>
			<div className='product-line__loader'>{loading && <Loader />}</div>
			<div className='product-line__top'>
				<h2 className='product-line__title'>{title}</h2>
				<LinkBtn className='product-line__text' href={catalogHref}>
					{t('seeAll')}
				</LinkBtn>
			</div>
			<div className='product-line__bottom'>
				<div className='product-line__slider-container'>
					<Swiper
						className='product-line__slider'
						slidesPerView={5}
						spaceBetween={25}
						loop={true}
						pagination={pagination}
						modules={[Pagination]}
						breakpoints={{
							1440: {
								slidesPerView: 5,
								spaceBetween: 25
							},
							1024: {
								slidesPerView: 5,
								spaceBetween: 25,
								pagination: false
							},
							762: {
								slidesPerView: 4,
								spaceBetween: 25
							},
							576: {
								slidesPerView: 3,
								spaceBetween: 10
							},
							375: {
								slidesPerView: 2,
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
												<ProductCard product={el} variant='card' locale={'ru'} handleLoader={handleLoader}/>
											</div>
										</SwiperSlide>
								))
								: Array.from({ length: 12 }).map((_, index) => (
										<SwiperSlide key={index}>
											<ProductCard variant={'card'} locale={locale} handleLoader={handleLoader}/>
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
