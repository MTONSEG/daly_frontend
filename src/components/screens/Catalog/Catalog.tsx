'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { IProduct } from '@/types/types'
import './Catalog.scss'

import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'

export default function Catalog() {
	const [products, setProducts] = useState<IProduct[]>([])

	useEffect(() => {
		const fetchFeaturedProducts = async () => {
			try {
				const response = await fetch(
					`http://localhost:1337/api/products?populate=images,properties,category&pagination[page]=3&pagination[pageSize]=3`,
					{ cache: 'force-cache' }
				)

				const dataRow = await response.json()
				const data = dataRow.data
				setProducts(data)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchFeaturedProducts()
	}, [])

	return (
		<>
			{products.map((product, index) => (
				<ProductCard
					key={index}
					product={product}
					variant={'card'}
				></ProductCard>
			))}
		</>
	)
}
