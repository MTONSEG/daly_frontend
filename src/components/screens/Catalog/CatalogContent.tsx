import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { IProduct } from '@/types/types'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { filtersQueryBuilder } from '@/utils/filtersQueryBuilder'
import { fetchFilteredProducts } from '@/store/catalog/slice/catalog.slice'
import Container from '@/components/ui/containers/Container/Container'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { RootState } from '@/store/store'

interface Props {
	filters: any
	locale: string | string[]
}

const CatalogContent: React.FC<Props> = ({ filters, locale }) => {
	const dispatch: any = useAppDispatch()

	const fetchUrl = useMemo(
		() => filtersQueryBuilder(filters, locale),
		[filters, locale]
	)

	const fetchFilteredProductsMemoized = useCallback(() => {
		dispatch(fetchFilteredProducts(fetchUrl))
		console.log('Fetched the filtered Products')
	}, [dispatch, fetchUrl])

	const prevFetchUrl = useRef<string>()

	useEffect(() => {
		if (prevFetchUrl.current !== fetchUrl) {
			fetchFilteredProductsMemoized()
			prevFetchUrl.current = fetchUrl
		}
	}, [fetchFilteredProductsMemoized, fetchUrl])

	const filteredProductsSelector = (state: RootState) =>
		state.catalogProducts.catalogProducts
	const filteredProducts = useAppSelector(filteredProductsSelector)
	const memoizedFilteredProducts = useMemo(
		() => filteredProducts,
		[filteredProducts]
	)

	useEffect(() => {
		console.log('🚀 ~ Catalog ~ filteredProducts:', memoizedFilteredProducts)
	}, [memoizedFilteredProducts])

	return (
		<Container>
			<div className='catalog'>
				{memoizedFilteredProducts.map((product, index) => {
					return <ProductCard product={product} variant={'card'} key={index} />
				})}
			</div>
		</Container>
	)
}

export default React.memo(CatalogContent)
