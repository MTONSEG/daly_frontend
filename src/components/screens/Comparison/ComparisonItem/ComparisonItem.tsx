import React from 'react'
import './ComparisonItem.scss'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/containers/Container/Container'
import { IProductProperties } from '@/types/types'
import { upperFirstLetter } from '@/utils/upperFirtLetter'

interface IComparisonItemProps {
	propertyName: string
	propertyValues: Array<string | number>
}

const ComparisonItem: React.FC<IComparisonItemProps> = ({ propertyName, propertyValues }) => {
	const word = useTranslations('comparison')

	return (
		<div className='comparison-item'>
			<div className='comparison-item__prop'>{upperFirstLetter(propertyName)}</div>
			{propertyValues.map((value) => {
				return <div className='comparison-item__prop'>{value}</div>
			})}
		</div>
	)
}

export default ComparisonItem
