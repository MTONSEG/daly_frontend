'use client'

import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { useGetProductsByTagQuery } from '@/store/api/productRTKQ.api'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface IProductLine {
	title: string
	tag: 'hit'
	tagValue: boolean
	pageNum?: number
	sort?: string
}

const ProductLine: FC<IProductLine> = ({ title, tag, tagValue, pageNum }) => {
	const { data } = useGetProductsByTagQuery({ tag: tag, tagValue: tagValue, pageNum: pageNum })

	const t = useTranslations('home')

	return (
		<div className='product-line'>
			<div className='product-line__top'>
				<h2 className='product-line__title'>{title}</h2>
				<LinkBtn className='product-line__text' href='/catalog'>
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
							{ breakpoint: 576, settings: { dots: true, slidesToShow: 1, centerMode: true } },
							{ breakpoint: 768, settings: { dots: true, slidesToShow: 2 } },
							{ breakpoint: 1220, settings: { slidesToShow: 4 } },
							{ breakpoint: 1024, settings: { slidesToShow: 3 } }
						]}
						infinite={false}
					>
						{data?.data.map((el, key) => (
							<div style={{ width: '215px' }} key={key}>
								<ProductCard product={el} variant='card' locale={'ru'} />
							</div>
						))}
					</Slider>
				</div>
			</div>
		</div>
	)
}

export default ProductLine
