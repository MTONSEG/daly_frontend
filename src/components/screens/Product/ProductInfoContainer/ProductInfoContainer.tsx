import { FC } from 'react'
import { IProduct, IProductProperties } from '@/types/types'
import ProductInfoAction from './ProductInfoAction/ProductInfoAction'
import ProductInfo from './ProductInfo/ProductInfo'
import Button from '@/components/ui/buttons/Button/Button'
import { ArrowRight } from '@/components/ui/icons'
import { useTranslations } from 'use-intl'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'

interface IProductInfoContainer {
	properties: IProductProperties
	data: IProduct
}

const ProductInfoContainer: FC<IProductInfoContainer> = ({ properties, data }) => {
	const t = useTranslations('product')

	return (
		<div className='info'>
			<div className='info__left'>
				<ProductInfo
					data={{
						memory: properties.memory,
						ram: properties.ram,
						resolution: properties.resolution
					}}
				/>
			</div>

			<div className='info__right'>
				<ProductInfoAction price={data.attributes.price} id={data.id} />
				<LinkBtn href='/delivery'>
					<Button className='info__deliver-btn' variant='product'>
						{t('buy-button')} <ArrowRight />
					</Button>
				</LinkBtn>
			</div>
		</div>
	)
}

export default ProductInfoContainer
