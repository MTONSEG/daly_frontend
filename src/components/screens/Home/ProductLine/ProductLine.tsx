'use client'

import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { useGetProductsByTagQuery } from '@/store/api/productRTKQ.api'
import { useTranslations } from 'next-intl'
import { FC, useEffect } from 'react'

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

	useEffect(() => {
		console.log(data?.data[0].attributes)
	}, [data])

	return (
		<div className='product-line'>
			<div className='product-line__top'>
				<h2 className='product-line__title'>{title}</h2>
				<LinkBtn className='product-line__text' href='/catalog'>
					{t('seeAll')}
				</LinkBtn>
			</div>

			<div className='product-line__bottom'>
				{data?.data.map((el, key) => (
					<ProductCard product={el} key={key} variant='card' locale={'ru'} />
				))}
			</div>
		</div>
	)
}

export default ProductLine
