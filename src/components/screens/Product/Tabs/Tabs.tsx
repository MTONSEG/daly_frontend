import { FC } from 'react'
import './Tabs.scss'
import Button from '@/components/ui/buttons/Button/Button'
import TabContainer from './TabContainer/TabContainer'
import { useTranslations } from 'next-intl'
import { IProductProperties } from '@/types/types'
import { motion } from 'framer-motion'

interface ITabs {
	description: string
	properties: IProductProperties
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

	return (
		<div className='tabs'>
			<ul className='tabs__btns-wr'>
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
					<Button className='tabs__btn'>{t('accessories')}</Button>
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
			</ul>

			<TabContainer
				children={
					<div>
						{/* <DescriptionTab description={description} /> */}
						<Characteristics properities={properties} />
					</div>
				}
			/>
		</div>
	)
}

export default Tabs
