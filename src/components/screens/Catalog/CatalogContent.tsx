'use client'
import { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { filtersQueryBuilder } from '@/utils/filtersQueryBuilder'
import { fetchFilteredProducts } from '@/store/catalog/catalog.api'
import { RootState } from '@/store/store'
import { useParams } from 'next/navigation'
import CatalogGrid from './CatalogGrid/CatalogGrid'
import GridHead from '../../widgets/fragments/GridHead/GridHead'

const CatalogContent: React.FC = () => {
	const { locale } = useParams()
	const filters = useAppSelector((state: { filters: any }) => state.filters)
	const dispatch = useAppDispatch()

	const fetchUrl = filtersQueryBuilder(
		filters.filtersData,
		locale,
		filters.sortingOption,
		filters.sortingMethod,
		filters.page,
		filters.limit,
		filters.start
	)

	const fetchFilteredProductsMemoized = useCallback(() => {
		dispatch(fetchFilteredProducts(fetchUrl))
		console.log('Fetched the filtered Products' + filters.start)
	}, [dispatch, fetchUrl, filters.start])

	const prevFetchUrl = useRef<string>()
	useEffect(() => {
		if (prevFetchUrl.current !== fetchUrl) {
			fetchFilteredProductsMemoized()
			prevFetchUrl.current = fetchUrl
		}
	}, [fetchFilteredProductsMemoized, fetchUrl])

	const filteredProducts = useAppSelector((state: RootState) => state.catalogProducts)
	return (
		<div className='catalog-content'>
			<GridHead productsQuantity={filteredProducts.meta.pagination.total} />
			<CatalogGrid
				products={filteredProducts.catalogProducts}
				meta={filteredProducts.meta}
				gridMode={filteredProducts.gridMode}
			/>
			
		</div>
	)
}

export default CatalogContent
