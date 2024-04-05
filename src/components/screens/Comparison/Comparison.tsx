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
import ComparisonBlock from './ComparisonBlock/ComparisonBlock'
import Loader from '@/components/ui/loaders/Loader'
import EmptyList from '@/components/widgets/fragments/EmptyList/EmptyList'
import Breadcrumbs, { IBreadcrumb } from '@/components/ui/Breadcrumbs/Breadcrumbs'

const Comparison: React.FC = () => {
	const [comparisonDisplayType, setComparisonDisplayType] = useState<'all' | 'diff'>('all')
	const word = useTranslations('comparison')
	const productIds = useAppSelector((state) => state.comparison.products)
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
	const breadcrumbArr: IBreadcrumb[] = [
		{ label: 'Home', href: '/', active: false },
		{ label: 'Comparison', href: 'comparison', active: true }
	]

	return (
		<Container>
			<Breadcrumbs breadcrumbsArr={breadcrumbArr} />
			<div className='comparison'>
				<div className='comparison__head'>
					<div className='comparison__title'>{word('title')}</div>
					{productIds ? (
						<>
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
									<Loader />
								)}
							</div>
							<div className='comparison__controls'>
								<TransparentBtn
									onClick={() => {
										handleControlClick('all')
									}}
									isActive={comparisonDisplayType === 'all' && true}
								>
									{word('controls-all')}
								</TransparentBtn>
								<TransparentBtn
									onClick={() => {
										handleControlClick('diff')
									}}
									isActive={comparisonDisplayType === 'diff' && true}
								>
									{word('controls-diff')}
								</TransparentBtn>
							</div>
						</>
					) : (
						<EmptyList emptyText1={word('empty-text-1')} emptyText2={word('empty-text-2')} />
					)}
				</div>

				<div className='comparison__characteristics'>
					{products.length > 0 && products[0].attributes.properties && (
						<ComparisonBlock products={products} displayType={comparisonDisplayType} />
					)}
				</div>
			</div>
		</Container>
	)
}

export default Comparison
