'use client'
import React, { useEffect, useState } from 'react'
import './Favourites.scss'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/containers/Container/Container'
import GridHead from '@/components/widgets/fragments/GridHead/GridHead'
import CatalogGrid from '../Catalog/CatalogGrid/CatalogGrid'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { IProduct } from '@/types/types'
import { useParams } from 'next/navigation'
import EmptyList from '@/components/widgets/fragments/EmptyList/EmptyList'
import Breadcrumbs, { IBreadcrumb } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import { useFetchMultipleByIds } from '@/hooks/useFetchMultipleByIds'

const Favourites: React.FC = () => {
	const word = useTranslations('favourites')
	const productIds = useAppSelector((state) => state.favourites.products)
	console.log('🚀 ~ productIds:', productIds)
	const gridMode = useAppSelector((state) => state.catalogProducts.gridMode)
	const sortingWay = useAppSelector((state) => state.filters.sortingMethod)
	const sortingOption = useAppSelector((state) => state.filters.sortingOption)
	const [products, setProducts] = useState<IProduct[]>([])
	const { locale } = useParams()

	useEffect(() => {
		const fetchAllProducts = async () => {
			const fetchedProducts = await useFetchMultipleByIds(productIds, locale)
			const sortedProducts = [...fetchedProducts]

			const comparisonFunctions = {
				publishedAt: {
					asc: (a: IProduct, b: IProduct) =>
						new Date(a.attributes.publishedAt).getTime() -
						new Date(b.attributes.publishedAt).getTime(),
					desc: (a: IProduct, b: IProduct) =>
						new Date(b.attributes.publishedAt).getTime() -
						new Date(a.attributes.publishedAt).getTime()
				},
				rating: {
					asc: (a: IProduct, b: IProduct) => a.attributes.rating - b.attributes.rating,
					desc: (a: IProduct, b: IProduct) => b.attributes.rating - a.attributes.rating
				},
				price: {
					asc: (a: IProduct, b: IProduct) => a.attributes.price - b.attributes.price,
					desc: (a: IProduct, b: IProduct) => b.attributes.price - a.attributes.price
				}
			}

			const comparisonFunction = comparisonFunctions[sortingOption][sortingWay]

			sortedProducts.sort(comparisonFunction)

			setProducts(sortedProducts)
		}

		fetchAllProducts()
	}, [productIds, sortingWay, sortingOption])

	const breadcrumbArr: IBreadcrumb[] = [
		{ label: 'Home', href: '/', active: false },
		{ label: 'Favourites', href: 'favourites', active: true }
	]

	return (
		<Container>
			<div className='favourites'>
				<Breadcrumbs breadcrumbsArr={breadcrumbArr} />
				<div className='favourites__content'>
					<div className='favourites__head'>
						<div className='favourites__title'>{word('title')}</div>
						<GridHead />
					</div>
					{productIds.length > 0 ? (
						<CatalogGrid products={products} gridMode={gridMode} />
					) : (
						<EmptyList emptyText1={word('empty-text-1')} emptyText2={word('empty-text-2')} />
					)}
				</div>
			</div>
		</Container>
	)
}

export default Favourites
