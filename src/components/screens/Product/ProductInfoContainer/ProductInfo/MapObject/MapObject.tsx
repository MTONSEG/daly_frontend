import { FC } from 'react'
import { IProductinfo } from '../ProductInfo'
import { useTranslations } from 'next-intl'

const MapObject: FC<IProductinfo> = ({ data }) => {
	const t = useTranslations('product')

	return Object.entries(data).map((el, index) => (
		<div className='left-bottom__param-wr' key={index}>
			<p className='left-bottom__param-key'>{t(el[0])}:</p>
			<p className='left-bottom__param-value'>{el[1]}</p>
		</div>
	))
}

export default MapObject
