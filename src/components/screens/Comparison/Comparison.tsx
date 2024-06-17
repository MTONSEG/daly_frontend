'use client'
import React, { useEffect, useState } from 'react'
import './Comparison.scss'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/containers/Container/Container'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { IProduct } from '@/types/types'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import TransparentBtn from '@/components/ui/Buttons/TransparentBtn/TransparentBtn'
import ComparisonBlock from './ComparisonBlock/ComparisonBlock'
import Loader from '@/components/ui/loaders/Loader'
import EmptyList from '@/components/widgets/fragments/EmptyList/EmptyList'
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs'
import { useFetchProductsByIdsQuery } from '@/hooks/useFetchMultipleByIds'

const Comparison: React.FC = () => {
	const [comparisonDisplayType, setComparisonDisplayType] = useState<'all' | 'diff'>('all')
	const word = useTranslations('comparison')
	const productIds = useAppSelector((state) => state.comparison.products)
	const [products, setProducts] = useState<IProduct[]>([])
	const { locale } = useParams()

	const updateIsMobile = () => {
		setIsMobile(window.innerWidth < 578)
	}

	const {
		data: fetchedProducts,
	} = useFetchProductsByIdsQuery(
		{
			ids: productIds,
			locale
		},
		{
			skip: productIds.length === 0
		}
	)

	useEffect(() => {
		if (fetchedProducts) {
			setProducts(fetchedProducts)
		}

		updateIsMobile() 
		window.addEventListener('resize', updateIsMobile)

		return () => {
			window.removeEventListener('resize', updateIsMobile)
		}
	}, [productIds, locale, fetchedProducts])

	const [isMobile, setIsMobile] = useState(window.innerWidth < 568)

	const handleControlClick = (comparisonType: 'all' | 'diff') => {
		setComparisonDisplayType(comparisonType)
	}
	
	return (
		<Container>
			<Breadcrumbs />
			<div className='comparison'>
				<section className='comparison__head'>
					<h2 className='comparison__title'>{word('title')}</h2>
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
												locale={locale}
											/>
										)
									})
								) : (
									<Loader />
								)}
							</div>
							<nav className='comparison__controls'>
								<TransparentBtn
									onClick={() => {
										handleControlClick('all')
									}}
									isActive={comparisonDisplayType === 'all' && true}
									variant='comparison'
								>
									{word('controls-all')}
								</TransparentBtn>
								<TransparentBtn
									onClick={() => {
										handleControlClick('diff')
									}}
									isActive={comparisonDisplayType === 'diff' && true}
									variant='comparison'
								>
									{word('controls-diff')}
								</TransparentBtn>
							</nav>
						</>
					) : (
						<EmptyList emptyText1={word('empty-text-1')} emptyText2={word('empty-text-2')} />
					)}
				</section>

				<ul className='comparison__characteristics'>
					{products.length > 0 && products[0].attributes.properties && (
						<ComparisonBlock products={products} displayType={comparisonDisplayType} />
					)}
				</ul>
			</div>
		</Container>
	)
}

export default Comparison
