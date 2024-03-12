import { FC } from 'react'
import './Tabs.scss'
import Button from '@/components/ui/buttons/Button/Button'
import TabContainer from './TabContainer/TabContainer'
import { useTranslations } from 'next-intl'

const DescriptionTab: FC<{ description: string }> = ({ description }) => {
	const t = useTranslations('product')

	return (
		<div className='description-tab'>
			<h2 className='description__title'>{t('description')}</h2>

			{description}
		</div>
	)
}

const Tabs: FC = () => {
	const t = useTranslations('product')

	return (
		<div className='tabs'>
			<div className='tabs__btns-wr'>
				<Button className='tabs__btn active'>{t('description')}</Button>
				<Button className='tabs__btn'>{t('accessories')}</Button>
				<Button className='tabs__btn'>{t('accessories')}</Button>
				<Button className='tabs__btn'>{t('comments')}</Button>
				<Button className='tabs__btn'>{t('credit')}</Button>
				<Button className='tabs__btn active'>{t('deliver')}</Button>
			</div>

			<TabContainer
				children={
					<div>
						<DescriptionTab description='xxx' />
					</div>
				}
			/>
		</div>
	)
}

export default Tabs
