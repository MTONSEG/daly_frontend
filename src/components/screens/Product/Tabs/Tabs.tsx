import { FC, useState } from 'react'
import './Tabs.scss'
import { useTranslations } from 'next-intl'
import { IComment, IProductProperties } from '@/types/types'
import TabHead from './TabStructure/TabHead'
import TabContent from './TabStructure/TabContent'
import Comments from './TabComments/Comments'
import Delivery from './Delivery/Delivery'

interface ITabs {
	description: string
	properties: IProductProperties | undefined
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

const Credit = () => {
	const t = useTranslations('product')

	return (
		<div className='credit'>
			<h1 className='credit__title'>{t('credit')}</h1>
			<div className='credit-box'>
				<h2 className='credit-box__title'>Как купить в рассрочку?</h2>
				<ol className='credit-box__ol'>
					<li className='credit-box__li'>
						<span>1.</span>
						{t('addToBusket')}
					</li>
					<li className='credit-box__li'>
						<span>2.</span>
						{t('addToBusket')}
					</li>
					<li className='credit-box__li'>
						<span>3.</span>
						{t('addToBusket')}
					</li>
					<li className='credit-box__li'>
						<span>4.</span>
						{t('addToBusket')}
					</li>
					<li className='credit-box__li'>
						<span>5.</span>
						{t('addToBusket')}
					</li>
				</ol>
			</div>

			<div className='credit-box credit-box_small'>
				<h2 className='credit-box__title'>{t('mounthlyPayment')}</h2>
				<ul className='credit-box__ol_installment '>
					<li className='credit-box__li_installment'>
						<p className='credix-box__left-text'>{t('mounthlyPayment')}</p>
						<p className='credix-box__right-text'>8350 ∞ ₴</p>
					</li>
				</ul>
			</div>

			<div className='credit-box credit-box_small'>
				<h2 className='credit-box__title'>{t('mounthlyPayment')}</h2>
				<ul className='credit-box__ol_installment '>
					<li className='credit-box__li_installment'>
						<p className='credix-box__left-text'>{t('mounthlyPayment')}</p>
						<p className='credix-box__right-text'>8350 ∞ ₴</p>
					</li>
				</ul>
			</div>
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
		},
		{ title: t('comments'), content: <Comments /> },
		{ title: t('credit'), content: <Credit /> },
		{ title: t('deliver'), content: <Delivery /> }
	]

	return (
		<div className='tabs'>
			{/* <ol className='tabs__btns-wr'>
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
			</ol> */}
			<TabHead tabs={tabs} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
			<TabContent tabs={tabs} activeTabIndex={activeTabIndex} />
		</div>
	)
}

export default Tabs
