import React from 'react'
import './ComparisonBlock.scss'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/containers/Container/Container'
import ComparisonItem from '../ComparisonItem/ComparisonItem'
import { IProduct, IProductProperties } from '@/types/types'

interface IComparisonBlockProps {
	displayType: 'all' | 'diff'
	products: IProduct[]
}

const ComparisonBlock: React.FC<IComparisonBlockProps> = ({ displayType, products }) => {
	const word = useTranslations('comparison')

	const allProperties: string[] = Array.from(
		new Set(products.flatMap((product) => Object.keys(product.attributes.properties || {})))
	)

	const getPropertyValues = (propertyName: string): Array<string | number> => {
		return products
			.map((product) => product.attributes.properties?.[propertyName])
			.filter((value): value is string | number => value !== undefined)
	}

	const renderComparisonItems = () => {
		return allProperties.map((property, index) => (
			<ComparisonItem
				key={index}
				propertyName={property}
				propertyValues={getPropertyValues(property)}
			/>
		))
	}

	const renderFilteredItems = () => {
		if (displayType === 'all') {
			return renderComparisonItems()
		} else if (displayType === 'diff') {
			// Filter out properties where all values are the same among products
			const filteredProperties = allProperties.filter((property) => {
				const values = getPropertyValues(property)
				return new Set(values).size !== 1 // If all values are the same, the Set size will be 1
			})

			return filteredProperties.map((property, index) => (
				<ComparisonItem
					key={index}
					propertyName={property}
					propertyValues={getPropertyValues(property)}
				/>
			))
		} else {
			return null
		}
	}

	return (
		<div className='comparison-block'>
			<div className='comparison-block__title'>{word("characteristics-title")}</div>
			<div className='comparison-block__items'>{renderFilteredItems()}</div>
		</div>
	)
}

export default ComparisonBlock
