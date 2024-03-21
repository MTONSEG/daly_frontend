'use client'
import { memo, useCallback, useEffect, useMemo, useRef} from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { filtersQueryBuilder } from '@/utils/filtersQueryBuilder'
import { fetchFilteredProducts } from '@/store/catalog/catalog.api'
import { RootState } from '@/store/store'
import { useParams } from 'next/navigation'
import CatalogGrid from './CatalogGrid/CatalogGrid'
import CatalogGridHead from './CatalogGridHead/CatalogGridHead'


const CatalogContent: React.FC = () => {
	const { locale } = useParams()
	const filters = useAppSelector((state) => state.filters)
	const dispatch: any = useAppDispatch()
	//memoized building of the fetchURL
	const fetchUrl = useMemo(
		() =>
			filtersQueryBuilder(
				filters.filtersData,
				locale,
				filters.sortingOption,
				filters.sortingMethod,
				filters.page,
				filters.limit
			),
		[filters, locale]
	)
	//fetching filtered products if the fetchUrl changed
	const fetchFilteredProductsMemoized = useCallback(() => {
		dispatch(fetchFilteredProducts(fetchUrl))
		console.log('Fetched the filtered Products')
	}, [dispatch, fetchUrl])

	//chatgpt part for minimizing rerenders
	const prevFetchUrl = useRef<string>()
	useEffect(() => {
		if (prevFetchUrl.current !== fetchUrl) {
			fetchFilteredProductsMemoized()
			prevFetchUrl.current = fetchUrl
		}
	}, [fetchFilteredProductsMemoized, fetchUrl])

	const filteredProducts = useAppSelector(
		(state: RootState) => state.catalogProducts
	)
	const memoizedFilteredProducts = useMemo(
		() => filteredProducts.catalogProducts,
		[filteredProducts.catalogProducts]
	)

	useEffect(() => {
		console.log('Changed the memoized filtered products')
	}, [memoizedFilteredProducts])

	return (
		<div className='catalog-content'>
			<CatalogGridHead
				productsQuantity={filteredProducts.meta.pagination.total}
			/>
			<CatalogGrid
				products={memoizedFilteredProducts}
				meta={filteredProducts.meta}
				gridMode={filteredProducts.gridMode}
			/>
		</div>
	)
}

export default memo(CatalogContent)
