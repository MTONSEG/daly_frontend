import { FC, useState } from 'react'
import './Tabs.scss'
import { useTranslations } from 'next-intl'
import { IProductProperties } from '@/types/types'
import TabHead from './TabStructure/TabHead'
import TabContent from './TabStructure/TabContent'

interface ITabs {
	description: string
	properties: IProductProperties
}

export interface ITab {
	title: string
	content: React.ReactNode
}

const DescriptionTab: FC<{ description: string }> = ({ description }) => {
	const t = useTranslations('product')

	return (
		<div className='description-tab'>
			<h2 className='description__title'>{t('description')}</h2>

			<p className='description__text'>{description}</p>
		</div>
	)
}

const Characteristics: FC<{ properities: IProductProperties }> = ({ properities }) => {
	const t = useTranslations('product')

	return (
		<div className='characteristics'>
			<h2 className='characteristics__title'>{t('characteristics')}</h2>

			<ul className='characteristics__list'>
				{Object.entries(properities).map((el, index) => {
					return (
						<li key={index} className='characteristics__line'>
							<p className='characteristics__key'>{t(el[0])}:</p>
							<p className='characteristics__value'>{el[1]}</p>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

const Tabs: FC<ITabs> = ({ description, properties }) => {
	const t = useTranslations('product')
	const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

	const tabs: ITab[] = [
		{
			title: t('description'),
			content: <DescriptionTab description={description} />
		},
		{
			title: t('characteristics'),
			content: <Characteristics properities={properties} />
		}
	]

	return (
		<div className='tabs'>
			{/* <ul className='tabs__btns-wr'>
				<motion.li
					className='tabs__li active'
					animate={{
						left: '-100px'
					}}
					transition={{ repeat: Infinity }}
				>
					<Button className='tabs__btn '>{t('description')}</Button>
				</motion.li>
				<motion.li className='tabs__li'>
					<Button className='tabs__btn'>{t('characteristics')}</Button>
				</motion.li>
				<motion.li className='tabs__li'>
					<Button className='tabs__btn'>{t('comments')}</Button>
				</motion.li>
				<motion.li className='tabs__li'>
					<Button className='tabs__btn'>{t('credit')}</Button>
				</motion.li>
				<motion.li className='tabs__li active'>
					<Button className='tabs__btn active'>{t('deliver')}</Button>
				</motion.li>
			</ul> */}
			<TabHead tabs={tabs} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
			<TabContent tabs={tabs} activeTabIndex={activeTabIndex} />
		</div>
	)
}

export default Tabs
