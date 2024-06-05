'use client'
import Container from '@/components/ui/containers/Container/Container'
import SliderThumbnailFancyApp from '@/components/widgets/SliderThumbnail/SliderThumbnailFancyApp'
import './Product.scss'
import { inter, open_sans } from '@/fonts/fonts'
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs'
import { useParams, usePathname } from 'next/navigation'
import { useGetProductQuery } from '@/store/api/productRTKQ.api'
import { FC, useState } from 'react'
import ProductInfoContainer from './ProductInfoContainer/ProductInfoContainer'
import Tabs from './Tabs/Tabs'
import AdditionalGoods from './AdditionalGoods/AdditionalGoods'
import { motion } from 'framer-motion'
import { ArrowDown } from '@/components/ui/icons'
import { useTranslations } from 'next-intl'
import { IBreadcrumb } from '@/types/types'

interface IProduct {
	id: number
}

const LoremComp = () => {
	const t = useTranslations('product')
	const [openText, setOpenText] = useState(true)

	const variants = {
		active: {
			opacity: 1
		},
		inactive: {
			opacity: 0,
			height: 0,
			overflow: 'hidden'
		}
	}

	return (
		<div className='lorem'>
			<h2 className='lorem__title'>{t('loremTitle')}</h2>
			<motion.p
				className='lorem__text'
				variants={variants}
				animate={openText ? 'active' : 'inactive'}
			>
				{t('loremText')}
			</motion.p>

			<div className='lorem__show-more' onClick={() => setOpenText(!openText)}>
				<p className='lorem__show-more-text'>
					{openText ? `${t('showMore')}` : `${t('showLess')}`}
				</p>
				<motion.div
					variants={{ active: { rotate: '180deg' }, inActive: { rotate: '0deg' } }}
					animate={openText ? 'active' : 'inactive'}
				>
					<ArrowDown />
				</motion.div>
			</div>
		</div>
	)
}

const Product: FC<IProduct> = ({ id }) => {
	const { locale } = useParams()

	const { data, isLoading } = useGetProductQuery({ locale: locale[0], id: id })
	const properties = data && data.data.attributes.properties

	const currentPath = usePathname()

	const breadcrumbArr: IBreadcrumb[] = [
		{ label: 'home', href: '/', active: false },
		{
			label: data?.data.attributes.title ? data?.data.attributes.title : '',
			href: currentPath,
			active: true
		}
	]
	
	return (
		<Container>
			<Breadcrumbs breadcrumbsArr={breadcrumbArr} />
			<div className='container_product'>
				<div className={`${open_sans.className} ${inter.className} product`}>
					<h2 className='product__title'>{data?.data.attributes.title}</h2>

					<div className='product__slider-container'>
						{data?.data.attributes.images && (
							<SliderThumbnailFancyApp images={data.data.attributes.images} />
						)}
					</div>
					{data && properties && <ProductInfoContainer data={data?.data} properties={properties} />}
				</div>

				<Tabs
					properties={properties}
					description={
						data?.data.attributes.description
							? data?.data.attributes.description
							: 'No description have been found'
					}
				/>

				<AdditionalGoods />
			</div>
			<LoremComp />
		</Container>
	)
}

export default Product
