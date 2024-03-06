import ColorPicker from '../../../widgets/fragments/ColorPicker/ColorPicker'
import './ProductInfoCenter.scss'
import { FC } from 'react'
import { useTranslations } from 'next-intl'

interface IProductInfoCenter {
	data: {
		memory: string
		ram: string
		resolution: string
	}
}

const ProductInfoCenter: FC<IProductInfoCenter> = (data) => {
	const t = useTranslations('product')

	console.log(Object.entries(data.data))

	return (
		<>
			<div className='product__info_left_top'>
				<p className='product__info_left_top_text'>{t('memory')}</p>
				<div className='product__info_left_top__params'>
					<button className='product__info_left_top__params_btn'>{data.data.memory}</button>
				</div>
			</div>

			<div className='product__info_left_center'>
				<p className='product__info_left_center_text'>{t('color')}</p>
				<ColorPicker variant='forPage' />
			</div>

			<div className='product__info_left_bottom'>
				<p className='product__info_left_bottom_text'>{t('characteristics')}</p>
				<div className='product__info_left_bottom__param'>
					{Object.entries(data.data).map((el) => (
						<div className='product__info_left_bottom__param-wr'>
							<p className='product__info_left_bottom__param_key'>{t(el[0])}:</p>
							<p className='product__info_left_bottom__param_value'>{el[1]}</p>
						</div>
					))}
					<p className='product__info_left_bottom__param_all'>{t('allCharacteristics')}</p>
				</div>
			</div>
		</>
	)
}

export default ProductInfoCenter
