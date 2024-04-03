'use client'
import React, { useEffect, useState } from 'react'
import './Comparison.scss'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/containers/Container/Container'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { getData } from '@/services/axios.config'
import { IProduct, IResponse } from '@/types/types'
import listImage from '@/assets/images/list-image.png'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import TransparentBtn from '@/components/ui/buttons/TransparentBtn/TransparentBtn'
import Loader from '@/components/ui/loaders/Loader'

const Basket: React.FC = () => {
	const word = useTranslations('comparison')
	const productIds = useAppSelector((state) => state.comparison.products)
	const [products, setProducts] = useState<IProduct[]>([])
	const { locale } = useParams()
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const productRequests = productIds.map(async (productId) => {
					const product = await getData<IResponse<IProduct>>(
						`/products/${productId}?locale=${locale}&populate=images,properties,category,brand,product_comments`
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
		<Container>
			<div className='basket'></div>
		</Container>
	)
}

export default Basket
