'use client'
import Container from '@/components/ui/containers/Container/Container'
import SliderThumbnailFancyApp from '@/components/widgets/SliderThumbnail/SliderThumbnailFancyApp'
import './Product.scss'
import { inter, open_sans } from '@/fonts/fonts'
import Breadcrumbs, { IBreadcrumb } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import { useParams, usePathname } from 'next/navigation'
import { useGetProductQuery } from '@/store/api/productRTKQ.api'
import { FC, useState } from 'react'
import ProductInfoContainer from './ProductInfoContainer/ProductInfoContainer'
import Tabs from './Tabs/Tabs'
import AdditionalGoods from './AdditionalGoods/AdditionalGoods'
import { motion } from 'framer-motion'
import { ArrowDown } from '@/components/ui/icons'
import { useTranslations } from 'next-intl'

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
			<h2 className='lorem__title'>Lorem</h2>
			<motion.p
				className='lorem__text'
				variants={variants}
				animate={openText ? 'active' : 'inactive'}
			>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem molestias ipsum
				maiores cumque excepturi beatae ex, aperiam hic impedit assumenda, veniam optio blanditiis
				reiciendis non consectetur necessitatibus quas nihil earum? Totam quo similique perferendis
				asperiores a nam numquam minus, recusandae aspernatur sequi fugit soluta reprehenderit?
				Aliquid maiores nisi quibusdam error, aperiam, deserunt, libero adipisci magnam incidunt ut
				iste corporis sunt. Hic, at ipsa quibusdam repellendus accusantium exercitationem a dolor
				voluptatibus fugiat officiis corrupti iure asperiores omnis, praesentium vero dolorem iusto
				quod blanditiis laborum? Vel reiciendis sint dolores quod recusandae ea? Odit tempore quia
				sequi atque in, delectus facere aliquid dignissimos reiciendis praesentium nulla, magnam
				placeat recusandae, minus voluptatum amet odio harum! Ut recusandae autem, dicta dignissimos
				rem inventore tempora neque. Non, nemo adipisci. Natus ut quaerat architecto voluptates.
				Quos tempora, quibusdam sapiente qui iste quasi quaerat suscipit quidem esse eos minima ipsa
				provident, ea fugiat, ab quae mollitia velit recusandae! Earum aut quasi ex tempora! Vel
				accusantium esse soluta reprehenderit culpa magni. Corrupti, iusto quibusdam! Voluptatibus
				nisi, reiciendis pariatur eligendi voluptates deserunt praesentium laudantium quaerat magnam
				libero quibusdam dolorum atque. Quis obcaecati ipsum dolorum dignissimos numquam facilis
				aliquid exercitationem maxime ratione veritatis corporis aspernatur, vel est recusandae
				sequi impedit quidem aut earum repudiandae quod minus perferendis sapiente adipisci. At,
				dignissimos. Aliquam amet fugiat aspernatur nihil est voluptatum magnam, architecto
				necessitatibus nemo eius iste. Corrupti impedit doloremque, quia a quo perspiciatis veniam
				possimus officiis in nemo, nesciunt aliquid ab, aspernatur sint. Vero consequuntur, at
				perspiciatis eos consequatur tempora corrupti suscipit hic esse ducimus vitae et deleniti
				sed culpa tenetur? Doloribus nemo eos tenetur sit, laboriosam accusamus nam debitis commodi
				adipisci ipsum! Sunt, animi nam pariatur dignissimos aspernatur culpa laboriosam accusamus
				ex repellendus eligendi amet deleniti et est molestiae consectetur fuga nemo maiores,
				exercitationem earum, vitae assumenda in? Suscipit sint optio beatae.
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

	if (isLoading) {
		return <div>loading...</div>
	}
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
