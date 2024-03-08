'use client'
import Container from '@/components/ui/containers/Container/Container'
import SliderThumbnailFancyApp from '@/components/widgets/SliderThumbnail/SliderThumbnailFancyApp'
import './Product.scss'
import { inter, open_sans } from '@/fonts/fonts'
import Breadcrumbs, { IBreadcrumb } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import { usePathname } from 'next/navigation'
import { useGetProductQuery } from '@/store/api/productRTKQ.api'
import { FC } from 'react'
import ProductInfoContainer from './ProductInfoContainer/ProductInfoContainer'

interface IProduct {
	id: number
}

const Product: FC<IProduct> = ({ id = 304 }) => {
	// {data} - готово
	// глянуть типизацию в слайдере - готово
	// bem
	// кнопку в вариант вынести с параметром
	// разделить на мелкие компоненты центр
	// выделить ифно в отдельную компоненту
	// кнопки,где нужны кнопки,кнопки - где любое действие
	// вынести в отдельную компоненту перебор характеристик

	const { data, isLoading } = useGetProductQuery({ locale: 'ru', id: id })
	const properties = data && data.data.attributes.properties

	const currentPath = usePathname()

	const breadcrumbArr: IBreadcrumb[] = [
		{ label: 'test', href: '/', active: false },
		{ label: 'test2', href: `${currentPath}`, active: true }
	]

	if (isLoading) {
		return <div>loading...</div>
	}
	return (
		<Container>
			<Breadcrumbs breadcrumbsArr={breadcrumbArr} />

			<div className={`${open_sans.className} ${inter.className} product`}>
				<h2 className='product__title'>{data?.data.attributes.title}</h2>

				<div className='product__slider-container'>
					{data?.data.attributes.images && (
						<SliderThumbnailFancyApp images={data.data.attributes.images} />
					)}
				</div>
				{data && properties && <ProductInfoContainer data={data?.data} properties={properties} />}
			</div>
		</Container>
	)
}

export default Product
