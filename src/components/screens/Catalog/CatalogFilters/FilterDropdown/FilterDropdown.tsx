'use client'
import React, { useState } from 'react'
import { TriangleIcon } from '@/components/ui/icons'
import Checkbox from '../../../../ui/checkboxes/Checkbox'
import './FilterDropDown.scss'
import { IFilter } from '@/types/types'
import { upperFirstLetter } from '@/utils/upperFirtLetter'
import PriceRange from '@/components/ui/forms/PriceRange/PriceRange'

interface IFilterDropDownProps {
	filter: IFilter
	updateFilter: (updatedFilter: IFilter) => void
}

const FilterDropDown: React.FC<IFilterDropDownProps> = ({
	filter,
	updateFilter
}) => {
	const [dropActive, setDropActive] = useState<boolean>(false)
	const [values, setValues] = useState([0, 100])
	const handleChange = (newValues: number[]) => {
		setValues(newValues)
	}
	const handleToggleCheckbox = (
		field: 'category' | 'brand' | 'option',
		optionId: number
	) => {
		const fieldHandlers = {
			category: () => {
				const updatedCategories = filter.attributes.categories.map(
					(category) => {
						if (category.id === optionId) {
							return { ...category, active: !category.active }
						}
						return category
					}
				)
				return {
					...filter,
					attributes: { ...filter.attributes, categories: updatedCategories }
				}
			},
			brand: () => {
				const updatedBrands = filter.attributes.brands.map((brand) => {
					if (brand.id === optionId) {
						return { ...brand, active: !brand.active }
					}
					return brand
				})
				return {
					...filter,
					attributes: { ...filter.attributes, brands: updatedBrands }
				}
			},
			option: () => {
				const updatedOptions = filter.attributes.options.map((option) => {
					if (option.id === optionId) {
						return { ...option, active: !option.active }
					}
					return option
				})
				return {
					...filter,
					attributes: { ...filter.attributes, options: updatedOptions }
				}
			}
		}

		const updatedFilter = fieldHandlers[field] ? fieldHandlers[field]() : filter

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
				<div className='filter-dropdown__name'>{upperFirstLetter(filter.attributes.label) }</div>
				<div className={`filter-dropdown__arrow ${dropActive && "active"}`}></div>
			</div>
			<div className={`filter-dropdown__body ${dropActive && 'active'}`}>
				{filter.attributes.min_price !== null &&
					filter.attributes.max_price !== null && (
						<PriceRange
							maxPrice={filter.attributes.max_price}
							minPrice={filter.attributes.min_price}
							values={values}
							onChange={handleChange}
						/>
					)}
				{filter.attributes.categories.length > 0 &&
					filter.attributes.categories.map((category, index) => (
						<Checkbox
							key={index}
							label={category.category.data.attributes.label}
							isActive={category.active}
							toggleCheckbox={() =>
								handleToggleCheckbox('category', category.id)
							}
						/>
					))}
				{filter.attributes.categories.length > 0 &&
					filter.attributes.categories.map((category, index) => (
						<Checkbox
							key={index}
							label={category.category.data.attributes.label}
							isActive={category.active}
							toggleCheckbox={() =>
								handleToggleCheckbox('category', category.id)
							}
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
