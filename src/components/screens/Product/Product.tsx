'use client'
import Container from '@/components/ui/containers/Container/Container'
import SliderThumbnailFancyApp from '@/components/widgets/SliderThumbnail/SliderThumbnailFancyApp'
import './Product.scss'
import { inter, open_sans } from '@/fonts/fonts'
import ProductInfoCenter from '@/components/screens/Product/ProductInfoCenter/ProductInfoCenter'
import ProductInfoRight from './ProductInfoRight/ProductInfoRight'
import Button from '@/components/ui/buttons/Button/Button'
import { ArrowRight } from '@/components/ui/icons'
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs'
import { usePathname } from 'next/navigation'
import { useGetProductQuery } from '@/store/api/productRTKQ.api'
import { useTranslations } from 'use-intl'
import { FC } from 'react'
interface IProduct {
	id: number
}

const Product: FC<IProduct> = ({ id = 304 }) => {
	const t = useTranslations('product')
	// {isError,data}
	// глянуть типизация в слайдере
	// bem
	// кнопку в вариант вынести с параметром
	// разделить на мелкие компоненты центр
	// выделить ифно в отдельную компоненту
	// кнопки,где нужны кнопки,кнопки - где любое действие
	// вынести в отдельную компоненту перебор характеристик

	const rtkQuery = useGetProductQuery({ locale: 'ru', id: id }).data?.data
	const properties = rtkQuery && rtkQuery.attributes.properties

	const currentPath = usePathname()

	const breadcrumbArr: IBreadcrumb[] = [
		{ label: 'test', href: '/', active: false },
		{ label: 'test2', href: `${currentPath}`, active: true }
	]

	return (
		<Container>
			<Breadcrumbs breadcrumbsArr={breadcrumbArr} />
			{rtkQuery && (
				<div className={`${open_sans.className} ${inter.className} product`}>
					<div className='product__title'>{rtkQuery.attributes.title}</div>
					<div className='product__slider-container'>
						{rtkQuery.attributes.images && (
							<SliderThumbnailFancyApp images={rtkQuery.attributes.images} />
						)}
					</div>
					<div className='product__info'>
						<div className='product__info_left'>
							{properties && (
								<ProductInfoCenter
									data={{
										memory: properties.memory,
										ram: properties.ram,
										resolution: properties.resolution
									}}
								/>
							)}
						</div>
						<div className='product__info__right'>
							<ProductInfoRight price={rtkQuery.attributes.price} />
							<Button className='product__info_deliver-btn' variant='product'>
								{t('buy-button')} <ArrowRight />
							</Button>
						</div>
					</div>
				</div>
			)}
		</Container>
	)
}

export default Product
