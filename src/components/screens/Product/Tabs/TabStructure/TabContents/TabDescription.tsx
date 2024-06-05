import { useTranslations } from 'next-intl'
import { FC } from 'react'
import './TabDescription.scss';

const DescriptionTab: FC<{ description: string }> = ({ description }) => {
	const t = useTranslations('product')

	return (
		<div className='description-tab'>
			<h2 className='description__title'>{t('description')}</h2>

			<p className='description__text'>{description}</p>
		</div>
	)
}

export default DescriptionTab
