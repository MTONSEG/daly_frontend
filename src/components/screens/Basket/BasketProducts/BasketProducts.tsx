'use client'
import React, { useEffect, useState } from 'react'
import './BasketProducts.scss'
import { upperFirstLetter } from '@/utils/upperFirtLetter'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { useParams } from 'next/navigation'
import { IProduct, IResponse } from '@/types/types'
import { getData } from '@/services/axios.config'
import BasketRow from './BasketRow/BasketRow'

const BasketProducts: React.FC = () => {
	const productIds = useAppSelector((state) => state.basket.products)
	const [products, setProducts] = useState<IProduct[]>([])
	const { locale } = useParams()
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const productRequests = productIds.map(async (productId) => {
					const product = await getData<IResponse<IProduct>>(
						`/products/${productId.id}?locale=${locale}&populate=images,properties,category,brand,product_comments`
					)
					return product.data
				})

				const fetchedProducts = await Promise.all(productRequests)

				setProducts(fetchedProducts)
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		}

		fetchProducts()
	}, [productIds])
	return (
		<div className='basket-products'>
			{products.length > 0 &&
				products.map((product, index) => {
					if (productIds[index]) {
						return (
							<BasketRow product={product} quantity={productIds[index].quantity} key={product.id} />
						)
					}
				})}
		</div>
	)
}

export default BasketProducts
