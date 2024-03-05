'use client'
import { useEffect, useState } from 'react'
import { IProduct } from '@/types/types'
import './Catalog.scss'

import Container from '@/components/ui/containers/Container/Container'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { fetchAllFilters } from '@/store/filters/slice/filters.slice'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { useParams } from 'next/navigation'
import { filtersQueryBuilder } from '@/utils/filtersQueryBuilder'

export default function Catalog() {
	const [products, setProducts] = useState<IProduct[]>([])

	const dispatch = useAppDispatch()

	const { locale } = useParams()
	// console.log('🚀 ~ Catalog ~ locale:', locale)

	useEffect(() => {
		// const fetchFeaturedProducts = async () => {
		// 	try {
		// 		const response = await fetch(
		// 			`http://localhost:1337/api/products?populate=images,properties,category&pagination[page]=3&pagination[pageSize]=3`,
		// 			{ cache: 'force-cache' }
		// 		)

		// 		const dataRow = await response.json()
		// 		const data = dataRow.data
		// 		setProducts(data)
		// 	} catch (error) {
		// 		console.error('Error fetching data:', error)
		// 	}
		// }

		// fetchFeaturedProducts()
		dispatch(fetchAllFilters(locale))
	}, [])

	const filters = useAppSelector((state) => state.filters.filtersData)

	useEffect(() => {
		console.log(
			'🚀 ~ Catalog ~ filtersQueryBuilder(filters);:',
			filtersQueryBuilder(filters)
		)
	}, [filters])

	// const fetchBrands = async () => {
	// 	try {
	// 		// Fetch brands
	// 		const brandsResponse = await fetch(
	// 			'http://localhost:1337/api/brands?locale=ru',
	// 			{
	// 				headers: {
	// 					Authorization:
	// 						'Bearer 5a23fab774dfd8f9462b560402b2526166265a115052aa4ce678fb366f006ad3258eef5ed974cd8ad744c4007a383ad94305df411f6d6271e80bf0d4149c3aa1e77c5e3652fdcc3aa32f3c90b99dca4083b5bbdaf6e798714a34c7a97c128e58554a3c41906b0f0428dd559b91fe74b0c5e37801ee351957c474b1ab9ca774d1'
	// 				}
	// 			}
	// 		)
	// 		const brandsData = await brandsResponse.json()

	// 		// Extract brand IDs
	// 		const brandIds = brandsData.data.map((brand: any) => ({
	// 			brand: brand.id
	// 		}))

	// 		// Make PUT request to update brands with brand IDs
	// 		await fetch('http://localhost:1337/api/filters/3', {
	// 			method: 'PUT',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization:
	// 					'Bearer 5a23fab774dfd8f9462b560402b2526166265a115052aa4ce678fb366f006ad3258eef5ed974cd8ad744c4007a383ad94305df411f6d6271e80bf0d4149c3aa1e77c5e3652fdcc3aa32f3c90b99dca4083b5bbdaf6e798714a34c7a97c128e58554a3c41906b0f0428dd559b91fe74b0c5e37801ee351957c474b1ab9ca774d1'
	// 			},
	// 			body: JSON.stringify({
	// 				data: {
	// 					brands: brandIds
	// 				}
	// 			})
	// 		})
	// 	} catch (error) {
	// 		console.error('Error fetching brands:', error)
	// 	}
	// }

	return (
		<>
			{/* <button
				style={{ margin: '300px' }}
				onClick={() => {
					fetchBrands()
				}}
			>
				PUSH MY PRODUCTS
			</button> */}
			{/* <Container>
				<div className='catalog'>
					{products.map((product, index) => (
						<ProductCard
							key={index}
							product={product}
							variant={'row'}
						></ProductCard>
					))}
				</div>
			</Container> */}
		</>
	)
}
