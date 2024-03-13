"use client"
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { filtersQueryBuilder } from '@/utils/filtersQueryBuilder'
import { fetchFilteredProducts } from '@/store/catalog/slice/catalog.slice'
import Container from '@/components/ui/containers/Container/Container'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
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
		() => filtersQueryBuilder(filters.filtersData, locale,filters.sortingOption,filters.sortingMethod),
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
		(state: RootState) => state.catalogProducts.catalogProducts
	)
	const memoizedFilteredProducts = useMemo(
		() => filteredProducts,
		[filteredProducts]
	)

	useEffect(() => {
		console.log('🚀 ~ Catalog ~ filteredProducts:', memoizedFilteredProducts)
	}, [memoizedFilteredProducts])

	return (
		<Container>
			<CatalogGridHead productsQuantity={memoizedFilteredProducts.length}/>
			<div className='catalog'>
				{memoizedFilteredProducts.map((product, index) => {
					return <ProductCard product={product} variant={'card'} key={index} />
				})}
			</div>
		</Container>
	)
}

export default React.memo(CatalogContent)
