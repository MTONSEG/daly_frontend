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

const Comparison: React.FC = () => {
	const word = useTranslations('favourites')
	const productIds = useAppSelector((state) => state.favourites.products)
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

	const isMobile = window.innerWidth < 568

	return (
		<Container>
			<div className='comparison'>
				<div className='comparison__head'>
					<div className='comparison__title'>{word('title')}</div>
					<div className='comparison__head-cards'>
						<div className='comparison__head-cards-costyl'></div>
						{products.length > 0 ? (
							products.map((product, index) => {
								return (
									<ProductCard
										product={products[index]}
										variant={isMobile ? 'row' : 'card'}
										isCompared={true}
										key={index}
									/>
								)
							})
						) : (
							<div className='comparison__empty'>
								<div className='comparison__empty-text'>В избранном пусто</div>
								<div className='comparison__empty-text'>
									Добавляйте товары в избранное,чтобы просмотреть или купить их позже
								</div>
								<Image
									src={listImage}
									alt='list-image'
									className='comparison__empty-image'
									width={81}
									height={89}
								></Image>
							</div>
						)}
					</div>
					<div className='comparison__controls'></div>
				</div>
				<div className='comparison__characteristics'></div>
			</div>
		</Container>
	)
}

export default Comparison
