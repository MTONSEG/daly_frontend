'use client'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { filtersQueryBuilder } from '@/utils/filtersQueryBuilder'
import { fetchFilteredProducts } from '@/store/catalog/slice/catalog.slice'
import CatalogGrid from './CatalogGrid/CatalogGrid'
import { RootState } from '@/store/store'
import CatalogGridHead from './CatalogGridHead/CatalogGridHead'
import { IFiltersState } from '@/store/states'

interface Props {
	filters: IFiltersState
	locale: string | string[]
}

const CatalogContent: React.FC<Props> = ({ filters, locale }) => {
	const dispatch: any = useAppDispatch()
	//memoized building of the fetchURL
	const fetchUrl = useMemo(
		() =>
			filtersQueryBuilder(
				filters.filtersData,
				locale,
				filters.sortingOption,
				filters.sortingMethod
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
		console.log("Changed the memoized filtered products")
	}, [memoizedFilteredProducts])

	return (
		<div className='catalog-content'>
			<CatalogGridHead productsQuantity={memoizedFilteredProducts.length} />
			<CatalogGrid products={memoizedFilteredProducts} gridMode={filteredProducts.gridMode}/>
		</div>
	)
}

export default React.memo(CatalogContent)