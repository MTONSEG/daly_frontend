'use client'
import React, { useEffect, useState } from 'react'
import './Comparison.scss'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/containers/Container/Container'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { getData } from '@/services/axios.config'
import { IProduct, IResponse } from '@/types/types'
import listImage from '@/assets/images/list-image.png'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import TransparentBtn from '@/components/ui/buttons/TransparentBtn/TransparentBtn'

const Comparison: React.FC = () => {
	const [comparisonDisplayType, setComparisonDisplayType] = useState<'all' | 'diff'>('all')
	const word = useTranslations('comparison')
	const productIds = useAppSelector((state) => state.favourites.products)
	const [products, setProducts] = useState<IProduct[]>([])
	const { locale } = useParams()
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const productRequests = productIds.map(async (productId) => {
					const product = await getData<IResponse<IProduct>>(
						`/products/${productId}?locale=${locale}&populate=images,properties,category,brand,product_comments`
					)
					return product.data
				})

				const fetchedProducts = await Promise.all(productRequests)

				setProducts(fetchedProducts)
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		}

		fetchProducts()
	}, [productIds])

	const isMobile = window.innerWidth < 568

	const handleControlClick = (comparisonType: 'all' | 'diff') => {
		setComparisonDisplayType(comparisonType)
	}

	return (
		<Container>
			<div className='comparison'>
				<div className='comparison__head'>
					<div className='comparison__title'>{word('title')}</div>
					<div className='comparison__head-cards'>
						<div className='comparison__head-cards-costyl'></div>
						{products.length > 0 ? (
							products.map((product) => {
								return (
									<ProductCard
										product={product}
										variant={isMobile ? 'row' : 'card'}
										isCompared={true}
										key={product.id}
									/>
								)
							})
						) : (
							<div className='comparison__empty'>
								<div className='comparison__empty-text'>{word('empty-text-1')}</div>
								<div className='comparison__empty-text'>{word('empty-text-2')}</div>
								<Image
									src={listImage}
									alt='list-image'
									className='comparison__empty-image'
									width={81}
									height={89}
								></Image>
							</div>
						)}
					</div>
					<div className='comparison__controls'>
						<TransparentBtn
							onClick={() => {
								handleControlClick('all')
							}}
						>
							{word('controls-all')}
						</TransparentBtn>
						<TransparentBtn
							onClick={() => {
								handleControlClick('diff')
							}}
						>
							{word('controls-diff')}
						</TransparentBtn>
					</div>
				</div>
				<div className='comparison__characteristics'></div>
			</div>
		</Container>
	)
}

export default Comparison
