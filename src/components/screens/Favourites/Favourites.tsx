'use client'
import React, { useEffect, useState } from 'react'
import './Favourites.scss'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/containers/Container/Container'
import GridHead from '@/components/widgets/fragments/GridHead/GridHead'
import CatalogGrid from '../Catalog/CatalogGrid/CatalogGrid'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { getData } from '@/services/axios.config'
import { IProduct, IResponse } from '@/types/types'

const Favourites: React.FC = () => {
	const word = useTranslations('favourites')
	const productIds = useAppSelector((state) => state.favourites.products)
	const gridMode = useAppSelector((state) => state.catalogProducts.gridMode)
	const sortingWay = useAppSelector((state) => state.filters.sortingMethod)
	const sortingOption = useAppSelector((state) => state.filters.sortingOption)
	const [products, setProducts] = useState<IProduct[]>([])
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const productRequests = productIds.map(async (productId) => {
					const product = await getData<IResponse<IProduct>>(
						`/products/${productId}?locale=en&populate=images,properties,category,brand,product_comments`
					)
					return product.data
				})

				const fetchedProducts = await Promise.all(productRequests)
				let sortedProducts = [...fetchedProducts]

				// Define comparison functions for different sorting options and ways
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
						asc: (a: IProduct, b: IProduct) =>
							a.attributes.rating - b.attributes.rating,
						desc: (a: IProduct, b: IProduct) =>
							b.attributes.rating - a.attributes.rating
					},
					price: {
						asc: (a: IProduct, b: IProduct) =>
							a.attributes.price - b.attributes.price,
						desc: (a: IProduct, b: IProduct) =>
							b.attributes.price - a.attributes.price
					}
				}

				// Get the appropriate comparison function based on sorting option and way
				const comparisonFunction =
					comparisonFunctions[sortingOption][sortingWay]

				// Sort the products using the selected comparison function
				sortedProducts.sort(comparisonFunction)

				setProducts(sortedProducts)
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		}

		fetchProducts()
	}, [productIds, sortingWay, sortingOption])

	return (
		<Container>
			<div className='favourites'>
				<div className='favourites__title'>{word('title')}</div>
				<div className='favourites__content'>
					<GridHead productsQuantity={productIds.length} />
					<CatalogGrid products={products} gridMode={gridMode} />
				</div>
			</div>
		</Container>
	)
}

export default Favourites
