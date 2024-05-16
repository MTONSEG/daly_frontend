import ColorPicker from '../../../../widgets/fragments/ColorPicker/ColorPicker'
import './ProductInfo.scss'
import { FC } from 'react'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/buttons/Button/Button'
import MapObject from './MapObject/MapObject'

export interface IProductinfo {
	data: {
		memory: string
		ram: string
		resolution: string
	}
}

const ProductInfo: FC<IProductinfo> = (data) => {
	const t = useTranslations('product')

	const onScrollButtonClickHandler = () => {}

	return (
		<div className='product-info'>
			<div className='product-info__left-top'>
				<p className='left-top__text'>{t('memory')}</p>

				<div className='left-top__params'>
					<Button variant='parameter' className='params__btn'>
						{data.data.memory}
					</Button>
				</div>
			</div>

			<div className='product-info__left-center'>
				<p className='left-center__text'>{t('color')}</p>
				<ColorPicker variant='forPage' />
			</div>

			<div className='product-info__left-bottom'>
				<p className='left-bottom__text'>{t('characteristics')}</p>

				<div className='left-bottom__param'>
					<MapObject data={data.data}></MapObject>

					<Button className='left-bottom__param-all-btn' onClick={onScrollButtonClickHandler}>
						{t('allCharacteristics')}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ProductInfo
