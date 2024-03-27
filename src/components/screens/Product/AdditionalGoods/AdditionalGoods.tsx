import React, { useEffect } from 'react'
import './AdditionalGoods.scss'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { IProduct } from '@/types/types'
import { useGetProductQuery, useGetProductsQuery } from '@/store/api/productRTKQ.api'
import { useParams } from 'next/navigation'

interface IAdditionalGoods {
	// products: IProduct[]
}

const AdditionalGoods = () => {
	const { locale } = useParams()

	const { data, isLoading } = useGetProductsQuery({ locale: 'ru', page: 3 })

	useEffect(() => {
		console.log(data?.data)
	}, [data])

	if (isLoading) {
		return <div>...loading</div>
	}
	return (
		<div className='goods'>
			<h2 className='goods__title'>Вместе с этим товаром покупают</h2>
			<div className='goods__row'>
				{data &&
					data.data.map((el, index) => (
						<ProductCard variant='card' product={data.data[index]} key={el.id} />
					))}
			</div>
		</div>
	)
}

export default AdditionalGoods
