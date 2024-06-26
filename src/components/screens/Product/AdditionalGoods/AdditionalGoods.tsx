import React from 'react'
import './AdditionalGoods.scss'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { useGetProductsQuery } from '@/store/api/productRTKQ.api'
import { useParams } from 'next/navigation'

const AdditionalGoods = () => {
	const { locale } = useParams()

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
						<ProductCard variant='card' product={data.data[index]} key={el.id} locale={locale} />
					))}
			</div>
		</div>
	)
}

export default AdditionalGoods
