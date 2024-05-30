'use client'
import { useEffect, useState } from 'react'
import './BasketContent.scss'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { useParams } from 'next/navigation'
import { IProduct } from '@/types/types'
import BasketRow from './BasketRow/BasketRow'
import BasketPriceCalculator from './BasketPriceCalculator/BasketPriceCalculator'
import Loader from '@/components/ui/loaders/Loader'
import EmptyList from '@/components/widgets/fragments/EmptyList/EmptyList'
import { useTranslations } from 'next-intl'
import { useFetchProductsByIdsQuery } from '@/hooks/useFetchMultipleByIds'
import { skipToken } from '@reduxjs/toolkit/query'

const BasketContent: React.FC = () => {
	const word = useTranslations('basket')
	const productIds = useAppSelector((state) => state.basket.products)
	console.log('🚀 ~ productIds:', productIds)
	const [products, setProducts] = useState<IProduct[]>([])
	const { locale } = useParams()
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const [totalDiscount, setTotalDiscount] = useState<number>(0)

	const productPlainIds = productIds.map((productId) => {
		return productId.id
	})

	const {
		data: fetchedProducts,
		error,
		isLoading
	} = useFetchProductsByIdsQuery(
		{
			ids: productPlainIds,
			locale
		},
		{
			skip: productIds.length === 0
		}
	)

	useEffect(() => {
		if (fetchedProducts && fetchedProducts.length > 0) {
			console.log('🚀 ~ useEffect ~ fetchedProducts:', fetchedProducts)
			setProducts(fetchedProducts)
		}
	}, [productIds, fetchedProducts])

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
				{products.length > 0 ? (
					products.map((product, index) => {
						return (
							<BasketRow product={product} quantity={productIds[index].quantity} key={product.id} />
						)
					})
				) : productPlainIds.length === 0 ? (
					<EmptyList emptyText1={word('empty-text-1')} emptyText2={word('empty-text-2')} />
				) : (
					<Loader />
				)}
			</div>
			<div className='basket-content__calculator'>
				<BasketPriceCalculator totalPrice={totalPrice} totalDiscount={totalDiscount} />
			</div>
		</div>
	)
}

export default BasketContent
