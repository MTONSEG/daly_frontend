'use client'

import '../../../widgets/SliderThumbnail/SliderThumbnail.scss'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { useGetProductsByTagQuery } from '@/store/api/productRTKQ.api'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

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
	logos,
	sortingOption,
	isDiscount
}) => {
	const { data } = useGetProductsByTagQuery({ tag: tag, tagValue: tagValue, pageNum: pageNum })
	const catalogHref = sortingOption
		? `/catalog?sorting=${sortingOption}`
		: isDiscount
		? `/catalog?isDiscount=${isDiscount}`
		: '/catalog'
	const t = useTranslations('home')

	return (
		<div className='product-line'>
			<div className='product-line__top'>
				<h2 className='product-line__title'>{title}</h2>
				<LinkBtn className='product-line__text' href={catalogHref}>
					{t('seeAll')}
				</LinkBtn>
			</div>
			<div className='product-line__bottom '>
				<div className='slider-container'>
					<Slider
						slidesToShow={5}
						arrows={false}
						responsive={[
							{ breakpoint: 375, settings: { dots: true, slidesToShow: 1 } },
							{ breakpoint: 576, settings: { dots: true, slidesToShow: 1.3, centerMode: false, centerPadding: "0px" } },
							{ breakpoint: 768, settings: { dots: true, slidesToShow: 2 } },
							{ breakpoint: 1220, settings: { slidesToShow: 4, centerMode: false} },
							{ breakpoint: 1024, settings: { slidesToShow: 3 } }
						]}
						infinite={false}
					>
						{!brands
							? data?.data.map((el, key) => (
									<div style={{ width: '215px' }} key={key}>
										<ProductCard product={el} variant='card' locale={'ru'} />
									</div>
							  ))
							: data?.data.map((el, index) => {
									if (el.attributes.images) {
										return (
											<div style={{ width: '175px' }} key={index}>
												<Image fill alt='brand' src={el.attributes.images[index].url} />
											</div>
										)
									} else {
										return
									}
							  })}
					</Slider>
				</div>
			</div>
		</div>
	)
}

export default ProductLine
