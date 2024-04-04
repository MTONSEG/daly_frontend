import React from 'react'
import './ComparisonItem.scss'
import { upperFirstLetter } from '@/utils/upperFirtLetter'

interface IComparisonItemProps {
	propertyName: string
	propertyValues: Array<string | number>
}

const ComparisonItem: React.FC<IComparisonItemProps> = ({ propertyName, propertyValues }) => {
	return (
		<div className='comparison-item'>
			<div className='comparison-item__prop'>{upperFirstLetter(propertyName)}</div>
			{propertyValues.map((value, index) => {
				return (
					<div key={index} className='comparison-item__prop'>
						{value}
					</div>
				)
			})}
		</div>
	)
}

export default ComparisonItem
