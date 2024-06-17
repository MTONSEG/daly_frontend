'use client'
import { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { filtersQueryBuilder } from '@/utils/filtersQueryBuilder'
import { fetchFilteredProducts } from '@/store/catalog/catalog.api'
import { RootState } from '@/store/store'
import { useParams, useSearchParams } from 'next/navigation'
import CatalogGrid from './CatalogGrid/CatalogGrid'
import GridHead from '../../widgets/fragments/GridHead/GridHead'
import { setSorting } from '@/store/filters/slice/filters.slice'

const CatalogContent: React.FC = () => {
	const { locale } = useParams()
	const filters = useAppSelector((state) => state.filters)
	const dispatch = useAppDispatch()
	
	const urlParams = useSearchParams()
	const urlSortingOption: 'publishedAt' | 'price' | 'rating' = urlParams.get('sorting') as 'publishedAt' | 'price' | 'rating'
	const urlSortingMethod = 'desc'
	const urlIsDiscounted: string | null = urlParams.get('isDiscount')

	useEffect(() => {
		dispatch(
			setSorting({
				sortingOption: urlSortingOption,
				sortingMethod: urlSortingMethod
			})
		)
	}, [urlSortingOption,dispatch])

	const fetchUrl = filtersQueryBuilder(
		filters.filtersData,
		locale,
		filters.sortingOption,
		filters.sortingMethod,
		filters.page,
		filters.limit,
		filters.start,
		urlIsDiscounted
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
