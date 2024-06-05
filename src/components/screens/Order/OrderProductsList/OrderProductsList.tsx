'use client'
import './OrderProductsList.scss'
import { FC, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { useParams } from 'next/navigation'
import { IProduct } from '@/types/types'
import { GreyCross } from '@/components/ui/icons'
import { Link } from '@/navigation'

interface IExtendedProduct extends IProduct {
	name: string
	price: number
	id: number
	quantity: number
}

const OrderProductsList: FC = () => {
	const word = useTranslations('order')

	const { locale } = useParams()
	const [products, setProducts] = useState<IExtendedProduct[]>([])
	const chosenProducts = useAppSelector((state) => state.basket.products)
	const productsData = useAppSelector((state) => state.order.order.productsData)

	useEffect(() => {
		// Extract product IDs and quantities from chosenProducts
		const productIds = chosenProducts.map((product: { id: number; quantity: number }) => product.id)

		// Filter productsData to get only the needed products by ID
		const filteredProducts = productsData?.filter((product: IProduct) =>
			productIds.includes(product.id)
		)

		// Build the extended products array
		const extendedProducts: IExtendedProduct[] | undefined = filteredProducts?.map(
			(product: IProduct) => {
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
			}
		)

		extendedProducts && setProducts(extendedProducts)
	}, [chosenProducts, productsData, locale])

	const wholePrice = useMemo(() => {
		return products.reduce((acc, product) => acc + product.price * product.quantity, 0)
	}, [products])

	return (
		<div className='order-products-list'>
			<section className='order-products-list__top-bottom'>
				<h4 className='order-products-list__item bold s18'>{word('chosen-title')}</h4>
				<Link href={'/basket'}>
					<div className='order-products-list__item underline'>{word('chosen-change-button')}</div>
				</Link>
			</section>
			<ul className='order-products-list__list'>
				{products.length > 0 ? (
					products.map((product) => (
						<section className='order-products-list__product' key={product.id}>
							<div className='order-products-list__box'>
								<p className='order-products-list__item name'>{product.name}</p>
								<section className='order-products-list__quantity'>
									<GreyCross />
									<p className='order-products-list__item grey s16'>{product.quantity}</p>
								</section>
							</div>
							<p className='order-products-list__item price'>{Math.ceil(product.price)} ₴</p>
						</section>
					))
				) : (
					<p className='order-products-list__item name'>{word("empty-list-text")}</p>
				)}
			</ul>
			<section className='order-products-list__top-bottom'>
				<p className='order-products-list__item'>{word('chosen-word')}</p>
				<p className='order-products-list__item bold s16'>{Math.ceil(wholePrice)} ₴</p>
			</section>
		</div>
	)
}

export default OrderProductsList
