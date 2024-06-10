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
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs'
import Loader from '@/components/ui/loaders/Loader'
import { useFetchProductsByIdsQuery } from '@/hooks/useFetchMultipleByIds'

const Favourites: React.FC = () => {
	const word = useTranslations('favourites')
	const productIds = useAppSelector((state) => state.favourites.products)
	console.log('🚀 ~ productIds:', productIds)
	const gridMode = useAppSelector((state) => state.catalogProducts.gridMode)
	const sortingWay = useAppSelector((state) => state.filters.sortingMethod)
	const sortingOption = useAppSelector((state) => state.filters.sortingOption)
	const { locale } = useParams()

	const {
		data: fetchedProducts,
		isLoading
	} = useFetchProductsByIdsQuery(
		{
			ids: productIds,
			locale
		},
		{
			skip: productIds.length === 0
		}
	)
	console.log('🚀 ~ fetchedProducts:', fetchedProducts)

	const [products, setProducts] = useState<IProduct[]>([])
	console.log(products)
	useEffect(() => {
		if (fetchedProducts) {
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

			const validSortingOption = comparisonFunctions[sortingOption]
			const validSortingWay = validSortingOption ? validSortingOption[sortingWay] : null

			if (validSortingWay) {
				sortedProducts.sort(validSortingWay)
			}

			setProducts(sortedProducts)
		}
	}, [products,productIds])

	
	return (
		<Container>
			<div className='favourites'>
				<Breadcrumbs />
				<div className='favourites__content'>
					<section className='favourites__head'>
						<h2 className='favourites__title'>{word('title')}</h2>
						<GridHead />
					</section>
					{isLoading ? (
						<Loader />
					) : products.length > 0 ? (
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
