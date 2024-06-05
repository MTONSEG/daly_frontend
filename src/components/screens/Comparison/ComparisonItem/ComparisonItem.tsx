import React from 'react'
import './ComparisonItem.scss'
import { upperFirstLetter } from '@/utils/upperFirtLetter'

interface IComparisonItemProps {
	propertyName: string
	propertyValues: Array<string | number>
}

const ComparisonItem: React.FC<IComparisonItemProps> = ({ propertyName, propertyValues }) => {
	return (
		<section className='comparison-item'>
			<h4 className='comparison-item__prop'>{upperFirstLetter(propertyName)}</h4>
			{propertyValues.map((value, index) => {
				return (
					<p key={index} className='comparison-item__prop'>
						{value}
					</p>
				)
			})}
		</section>
	)
}

export default ComparisonItem
