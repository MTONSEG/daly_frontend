"use client"
import './OrderProductsList.scss'
import { FC, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { useParams } from 'next/navigation'
import { IProduct } from '@/types/types'
import { GreyCross } from '@/components/ui/icons'
import Loader from '@/components/ui/loaders/Loader'
import { Link } from '@/navigation'

interface ExtendedProduct extends IProduct {
	name: string
	price: number
	id: number
	quantity: number
}

const OrderProductsList: FC = () => {
	const word = useTranslations('order')
	const { locale } = useParams()
	const [products, setProducts] = useState<ExtendedProduct[]>([])
	const chosenProducts = useAppSelector((state) => state.basket.products)
	const productsData = useAppSelector((state) => state.order.order.products)
	console.log("🚀 ~ productsData:", productsData)

	useEffect(() => {
		// Extract product IDs and quantities from chosenProducts
		const productIds = chosenProducts.map(
			(product: { id: number; quantity: number }) => product.id
		)

		// Filter productsData to get only the needed products by ID
		const filteredProducts = productsData.filter((product: IProduct) => productIds.includes(product.id))

		// Build the extended products array
		const extendedProducts: ExtendedProduct[] = filteredProducts.map((product: IProduct) => {
			const chosenProduct = chosenProducts.find(
				(chosenProduct: { id: number }) => chosenProduct.id === product.id
			)
			return {
				...product,
				name: product.attributes.title,
				price: product.attributes.discount
					? product.attributes.price - product.attributes.discount
					: product.attributes.price,
				quantity: chosenProduct ? chosenProduct.quantity : 0
			}
		})

		setProducts(extendedProducts)
	}, [chosenProducts, productsData, locale])

	const wholePrice = useMemo(() => {
		return products.reduce((acc, product) => acc + product.price * product.quantity, 0)
	}, [products])

	return (
		<div className='order-products-list'>
			<div className='order-products-list__top-bottom'>
				<div className='order-products-list__item bold s18'>{word('chosen-title')}</div>
				<Link href={'/basket'}>
					<div className='order-products-list__item underline'>
						{word('chosen-change-button')}
					</div>
				</Link>
			</div>
			<div className='order-products-list__list'>
				{products.length > 0 ? (
					products.map((product) => (
						<div className='order-products-list__product' key={product.id}>
							<div className='order-products-list__box'>
								<div className='order-products-list__item name'>{product.name}</div>
								<div className='order-products-list__quantity'>
									<GreyCross />
									<div className='order-products-list__item grey s16'>{product.quantity}</div>
								</div>
							</div>
							<div className='order-products-list__item price'>{Math.ceil(product.price)} ₴</div>
						</div>
					))
				) : (
					<Loader />
				)}
			</div>
			<div className='order-products-list__top-bottom'>
				<div className='order-products-list__item'>{word('chosen-word')}</div>
				<div className='order-products-list__item bold s16'>{Math.ceil(wholePrice)} ₴</div>
			</div>
		</div>
	)
}

export default OrderProductsList
