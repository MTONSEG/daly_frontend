import ColorPicker from '../../../../widgets/fragments/ColorPicker/ColorPicker'
import './ProductInfo.scss'
import { FC } from 'react'
import { useTranslations } from 'next-intl'

interface IProductinfo {
	data: {
		memory: string
		ram: string
		resolution: string
	}
}

const ProductInfo: FC<IProductinfo> = (data) => {
	const t = useTranslations('product')

	return (
		<div className='product-info'>
			<div className='product-info__left-top'>
				<p className='left-top__text'>{t('memory')}</p>
				<div className='left-top__params'>
					<button className='params__btn'>{data.data.memory}</button>
				</div>
			</div>

			<div className='product-info__left-center'>
				<p className='left-center__text'>{t('color')}</p>
				<ColorPicker variant='forPage' />
			</div>

			<div className='product-info__left-bottom'>
				<p className='left-bottom__text'>{t('characteristics')}</p>
				<div className='left-bottom__param'>
					{Object.entries(data.data).map((el, index) => (
						<div className='left-bottom__param-wr' key={index}>
							<p className='left-bottom__param-key'>{t(el[0])}:</p>
							<p className='left-bottom__param-value'>{el[1]}</p>
						</div>
					))}
					<button className='left-bottom__param-all-btn'>{t('allCharacteristics')}</button>
				</div>
			</div>
		</div>
	)
}

export default ProductInfo
