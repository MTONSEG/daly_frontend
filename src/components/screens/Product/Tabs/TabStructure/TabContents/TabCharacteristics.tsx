import { useTranslations } from 'next-intl'
import { IProductProperties } from '@/types/types'
import { FC } from 'react'

import './TabCharacteristics.scss'

const Characteristics: FC<{ properities: IProductProperties | undefined }> = ({ properities }) => {
	const t = useTranslations('product')

	return (
		<div className='characteristics'>
			{properities ? (
				<>
					<h2 className='characteristics__title'>{t('characteristics')}</h2>

					<ol className='characteristics__list'>
						{Object.entries(properities).map((el, index) => {
							if (el[0] === 'id') {
								return ''
							}
							return (
								<li key={index} className='characteristics__line'>
									<p className='characteristics__key'>{t(el[0])}:</p>
									<p className='characteristics__value'>{el[1]}</p>
								</li>
							)
						})}
					</ol>
				</>
			) : (
				<h1>error</h1>
			)}
		</div>
	)
}

export default Characteristics
