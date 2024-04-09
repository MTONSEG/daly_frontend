'use client'
import React, { useEffect, useState } from 'react'
import './Comparison.scss'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/containers/Container/Container'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { IProduct } from '@/types/types'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import TransparentBtn from '@/components/ui/buttons/TransparentBtn/TransparentBtn'
import ComparisonBlock from './ComparisonBlock/ComparisonBlock'
import Loader from '@/components/ui/loaders/Loader'
import EmptyList from '@/components/widgets/fragments/EmptyList/EmptyList'
import Breadcrumbs, { IBreadcrumb } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import { useFetchMultipleByIds } from '@/hooks/useFetchMultipleByIds'

const Comparison: React.FC = () => {
	const [comparisonDisplayType, setComparisonDisplayType] = useState<'all' | 'diff'>('all')
	const word = useTranslations('comparison')
	const productIds = useAppSelector((state) => state.comparison.products)
	const [products, setProducts] = useState<IProduct[]>([])
	const { locale } = useParams()

	const updateIsMobile = () => {
		setIsMobile(window.innerWidth < 578)
	}

	useEffect(() => {
		const fetchProducts = async () => {
			const fetchedProducts = await useFetchMultipleByIds(productIds, locale)
			setProducts(fetchedProducts)
		}

		fetchProducts()

		updateIsMobile() // Initial check for mobile
		window.addEventListener('resize', updateIsMobile)

		return () => {
			window.removeEventListener('resize', updateIsMobile)
		}
	}, [productIds, locale])

	const [isMobile, setIsMobile] = useState(window.innerWidth < 568)

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
