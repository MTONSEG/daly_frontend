'use client'
import React, { useState } from 'react'
import { TriangleIcon } from '@/components/ui/icons'
import Checkbox from '../../../../ui/checkboxes/Checkbox'
import './FilterDropDown.scss'
import { IFilter } from '@/types/types'

interface IFilterDropDownProps {
	filter: IFilter
	updateFilter: (updatedFilter: IFilter) => void 
}

const FilterDropDown: React.FC<IFilterDropDownProps> = ({
	filter,
	updateFilter
}) => {
	const [dropActive, setDropActive] = useState<boolean>(false)

	const handleToggleCheckbox = (
		field: 'category' | 'brand' | 'option',
		optionId: number
	) => {
		const updatedFilter: IFilter = JSON.parse(JSON.stringify(filter))

		switch (field) {
			case 'category':
				updatedFilter.attributes.categories =
					updatedFilter.attributes.categories.map((category) => {
						if (category.id === optionId) {
							return { ...category, active: !category.active }
						}
						return category
					})
				break
			case 'brand':
				updatedFilter.attributes.brands = updatedFilter.attributes.brands.map(
					(brand) => {
						if (brand.id === optionId) {
							return { ...brand, active: !brand.active }
						}
						return brand
					}
				)
				break
			case 'option':
				updatedFilter.attributes.options = updatedFilter.attributes.options.map(
					(option) => {
						if (option.id === optionId) {
							return { ...option, active: !option.active }
						}
						return option
					}
				)
				break
			default:
				break
		}

		updateFilter(updatedFilter)
	}

	return (
		<div className='filter-dropdown'>
			<div
				className='filter-dropdown__head'
				onClick={() => {
					setDropActive(!dropActive)
				}}
			>
				<div className='filter-dropdown__name'></div>
				<TriangleIcon
					className={`filter-dropdown__triangle-icon ${dropActive && 'active'}`}
				/>
			</div>
			<div className={`filter-dropdown__body ${dropActive && 'active'}`}>
				{filter.attributes.categories.length > 0 &&
					filter.attributes.categories.map((category, index) => (
						<Checkbox
							key={index}
							label={category.category.data.attributes.label}
							isActive={category.active}
							toggleCheckbox={() => handleToggleCheckbox('category', category.id)}
						/>
					))}
				{filter.attributes.brands.length > 0 &&
					filter.attributes.brands.map((brand, index) => (
						<Checkbox
							key={index}
							label={brand.brand.data.attributes.name}
							isActive={brand.active}
							toggleCheckbox={() => handleToggleCheckbox('brand', brand.id)}
						/>
					))}
				{filter.attributes.options.length > 0 &&
					filter.attributes.options.map((option, index) => (
						<Checkbox
							key={index}
							label={option.title}
							isActive={option.active}
							toggleCheckbox={() => handleToggleCheckbox('option', option.id)}
						/>
					))}
			</div>
		</div>
	)
}

export default FilterDropDown
