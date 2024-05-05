'use client'
import React, { useEffect, useState } from 'react'
import './BasketContent.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { useParams } from 'next/navigation'
import { IProduct } from '@/types/types'
import BasketRow from './BasketRow/BasketRow'
import BasketPriceCalculator from './BasketPriceCalculator/BasketPriceCalculator'
import Loader from '@/components/ui/loaders/Loader'
import EmptyList from '@/components/widgets/fragments/EmptyList/EmptyList'
import { useTranslations } from 'next-intl'
import { useFetchMultipleByIds } from '@/hooks/useFetchMultipleByIds'
import { fillProductsData } from '@/store/order/order.slice'

const BasketContent: React.FC = () => {
	const word = useTranslations('basket')
	const productIds = useAppSelector((state) => state.basket.products)
	const dispatch: any = useAppDispatch()
	const [products, setProducts] = useState<IProduct[]>([])
	const { locale } = useParams()
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const [totalDiscount, setTotalDiscount] = useState<number>(0)

	const productPlainIds = productIds.map((productId) => {
		return productId.id
	})
	useEffect(() => {
		const FetchProducts = async () => {
			const fetchedProducts = await useFetchMultipleByIds(productPlainIds, locale)
			setProducts(fetchedProducts)
			dispatch(fillProductsData({products: fetchedProducts}));
			// console.log("🚀 ~ FetchProducts ~ dispatch(fillProductsData({products: fetchedProducts})):", dispatch(fillProductsData({products: fetchedProducts})))
		}
		FetchProducts()
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
				{productIds.length > 0 && products.length > 0 ? (
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
				) : productIds.length === 0 ? (
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
