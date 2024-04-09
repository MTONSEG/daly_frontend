'use client'
import React, { useEffect, useState } from 'react'
import './BasketContent.scss'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { useParams } from 'next/navigation'
import { IProduct, IResponse } from '@/types/types'
import { getData } from '@/services/axios.config'
import BasketRow from './BasketRow/BasketRow'
import BasketPriceCalculator from './BasketPriceCalculator/BasketPriceCalculator'
import Loader from '@/components/ui/loaders/Loader'
import EmptyList from '@/components/widgets/fragments/EmptyList/EmptyList'
import { useTranslations } from 'next-intl'
import { useFetchMultipleByIds } from '@/hooks/useFetchMultipleByIds'

const BasketContent: React.FC = () => {
	const word = useTranslations('basket')
	const productIds = useAppSelector((state) => state.basket.products)
	const [products, setProducts] = useState<IProduct[]>([])
	const { locale } = useParams()
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const [totalDiscount, setTotalDiscount] = useState<number>(0)

	const productPlainIds = productIds.map((productId)=>{return productId.id});
	useEffect(() => {
		const fetchProducts = async () => {
			const fetchedProducts = await useFetchMultipleByIds(productPlainIds, locale)
			setProducts(fetchedProducts)
		}

		fetchProducts()
	}, [productIds])

	useEffect(() => {
		let totalPrice = 0
		let totalDiscount = 0

		products.forEach((product, index) => {
			if (productIds[index]) {
				const { quantity } = productIds[index]
				const { price, discount } = product.attributes

				totalPrice += price * quantity
				totalDiscount += (discount || 0) * quantity
			}
		})

		setTotalPrice(totalPrice)
		setTotalDiscount(totalDiscount)
	}, [products, productIds])
	return (
		<div className='basket-content'>
			<div className='basket-content__products'>
				{productIds ? (
					products.length > 0 ? (
						products.map((product, index) => {
							if (productIds[index]) {
								return (
									<BasketRow
										product={product}
										quantity={productIds[index].quantity}
										key={product.id}
									/>
								)
							}
						})
					) : (
						<Loader />
					)
				) : (
					<EmptyList emptyText1={word('empty-text-1')} emptyText2={word('empty-text-2')} />
				)}
			</div>
			<div className='basket-content__calculator'>
				<BasketPriceCalculator totalPrice={totalPrice} totalDiscount={totalDiscount} />
			</div>
		</div>
	)
}

export default BasketContent