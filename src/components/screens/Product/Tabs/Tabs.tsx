import { FC, useState } from 'react'
import './Tabs.scss'
import { useTranslations } from 'next-intl'
import { IProductProperties } from '@/types/types'
import TabHead from './TabStructure/TabHead'
import TabContent from './TabStructure/TabContent'
import Comments from './TabComments/Comments'
import Delivery from './Delivery/Delivery'
import DescriptionTab from './TabStructure/TabContents/TabDescription'
import Characteristics from './TabStructure/TabContents/TabCharacteristics'

interface ITabs {
	description: string
	properties: IProductProperties | undefined
}

export interface ITab {
	title: string
	content: React.ReactNode
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
		{ title: t('comments'), content: <Comments id={properties?.id ? properties?.id : 0} /> },
		// { title: t('credit'), content: <Credit /> },
		{ title: t('deliver'), content: <Delivery /> }
	]

	return (
		<div className='tabs'>
			<TabHead tabs={tabs} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
			<TabContent tabs={tabs} activeTabIndex={activeTabIndex} />
		</div>
	)
}

export default Tabs
