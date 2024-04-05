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

const BasketContent: React.FC = () => {
	const productIds = useAppSelector((state) => state.basket.products)
	const [products, setProducts] = useState<IProduct[]>([])
	const { locale } = useParams()
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [totalDiscount, setTotalDiscount] = useState<number>(0);
	
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

	useEffect(() => {
        let totalPrice = 0;
        let totalDiscount = 0;

        products.forEach((product, index) => {
            if (productIds[index]) {
                const { quantity } = productIds[index];
                const { price, discount } = product.attributes;

                totalPrice += price * quantity;
                totalDiscount += (discount || 0) * quantity;
            }
        });

        setTotalPrice(totalPrice);
        setTotalDiscount(totalDiscount);
    }, [products, productIds]);
	return (
		<div className='basket-content'>
			<div className='basket-content__products'>
				{products.length > 0 ?
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
					}): <Loader/>}
			</div>
			<div className='basket-content__calculator'>
				<BasketPriceCalculator totalPrice={totalPrice} totalDiscount={totalDiscount} />
			</div>
		</div>
	)
}

export default BasketContent
