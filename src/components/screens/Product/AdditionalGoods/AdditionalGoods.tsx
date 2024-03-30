import React, { useEffect } from 'react'
import './AdditionalGoods.scss'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { useGetProductsQuery } from '@/store/api/productRTKQ.api'

const AdditionalGoods = () => {
	const { data, isLoading } = useGetProductsQuery({
		locale: 'ru',
		page: Math.floor(Math.random() * 26)
	})

	if (isLoading) {
		return (
			<div className='goods'>
				<h2 className='goods__title'>Loading...</h2>
			</div>
		)
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
