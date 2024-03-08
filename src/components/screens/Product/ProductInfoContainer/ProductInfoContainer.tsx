import { IProduct, IProductProperties } from '@/types/types'
import ProductInfoCenter from './ProductInfo/ProductInfo'
import ProductInfoRight from './ProductInfoAction/ProductInfoAction'
import { FC } from 'react'
import Button from '@/components/ui/buttons/Button/Button'
import { ArrowRight } from '@/components/ui/icons'
import { useTranslations } from 'use-intl'

interface IProductInfoContainer {
	properties: IProductProperties
	data: IProduct
}

const ProductInfoContainer: FC<IProductInfoContainer> = ({ properties, data }) => {
	const t = useTranslations('product')

	return (
		<div className='info'>
			<div className='info__left'>
				<ProductInfoCenter
					data={{
						memory: properties.memory,
						ram: properties.ram,
						resolution: properties.resolution
					}}
				/>
			</div>

			<div className='info__right'>
				<ProductInfoRight price={data.attributes.price} />
				<Button className='info__deliver-btn' variant='product'>
					{t('buy-button')} <ArrowRight />
				</Button>
			</div>
		</div>
	)
}

export default ProductInfoContainer
