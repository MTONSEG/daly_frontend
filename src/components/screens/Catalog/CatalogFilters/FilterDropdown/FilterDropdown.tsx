import React, { useState } from 'react'
import './FilterDropDown.scss'
import { IFilter } from '@/types/types'
import { upperFirstLetter } from '@/utils/upperFirtLetter'
import Arrow from '@/components/ui/arrows/Arrow'

// probable dynamic import
import PriceRange from '@/components/ui/forms/PriceRange/PriceRange'
import Checkbox from '../../../../ui/checkboxes/Checkbox'
import ShowBtn from '@/components/ui/buttons/ShowBtn/ShowBtn'

interface IFilterDropDownProps {
	filter: IFilter
	updateFilter: (updatedFilter: IFilter) => void
}

const debounce = (func: Function, delay: number) => {
	let timer: NodeJS.Timeout
	return function (this: any, ...args: any[]) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}

const FilterDropDown: React.FC<IFilterDropDownProps> = ({
	filter,
	updateFilter
}) => {
	const isPrice: boolean =
		filter.attributes.min_price !== null && filter.attributes.max_price !== null
	const [dropActive, setDropActive] = useState<boolean>(isPrice)
	const [values, setValues] = useState([0, 10000])
	const [showAllItems, setShowAllItems] = useState<boolean>(false)

	const handleChange = (newValues: number[]) => {
		setValues(newValues)
		debounce(handleUpdatePriceRange, 1000)(newValues) // Correct invocation
	}

	const handleUpdatePriceRange = (newValues: number[]) => {
		const updatedFilter = {
			...filter,
			attributes: {
				...filter.attributes,
				min_price: newValues[0],
				max_price: newValues[1]
			}
		}
		updateFilter(updatedFilter)
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

	const totalItems =
		filter.attributes.categories.length +
		filter.attributes.brands.length +
		filter.attributes.options.length
	const itemsToShow = showAllItems ? totalItems : 6
	const shouldShowMoreButton = totalItems > 6

	const handleShowAllItems = () => {
		setShowAllItems(!showAllItems)
	}

	return (
		<div className='filter-dropdown'>
			<div
				className='filter-dropdown__head'
				onClick={() => {
					if (isPrice) {
						return
					} else {
						setDropActive(!dropActive)
					}
				}}
			>
				<div className='filter-dropdown__name'>
					{upperFirstLetter(filter.attributes.label)}
				</div>
				{!isPrice && <Arrow state={dropActive} />}
			</div>
			<div className={`filter-dropdown__body ${dropActive && 'active'}`}>
				{isPrice && (
					<PriceRange
						maxPrice={filter.attributes.max_price}
						minPrice={filter.attributes.min_price}
						values={values}
						onChange={handleChange}
					/>
				)}
				{filter.attributes.categories !== null &&
					filter.attributes.categories
						.slice(0, itemsToShow)
						.map((category, index) => (
							<Checkbox
								key={index}
								label={category.category.data.attributes.label}
								isActive={category.active}
								toggleCheckbox={() =>
									handleToggleCheckbox('category', category.id)
								}
							/>
						))}
				{filter.attributes.brands !== null &&
					filter.attributes.brands
						.slice(0, itemsToShow)
						.map((brand, index) => (
							<Checkbox
								key={index}
								label={brand.brand.data.attributes.name}
								isActive={brand.active}
								toggleCheckbox={() => handleToggleCheckbox('brand', brand.id)}
							/>
						))}
				{filter.attributes.options !== null &&
					filter.attributes.options
						.slice(0, itemsToShow)
						.map((option, index) => (
							<Checkbox
								key={index}
								label={option.title}
								isActive={option.active}
								toggleCheckbox={() => handleToggleCheckbox('option', option.id)}
							/>
						))}
				<ShowBtn
					showAllItems={showAllItems}
					setShowAllItems={handleShowAllItems}
					shouldShowMoreButton={shouldShowMoreButton}
				/>
			</div>
		</div>
	)
}

export default FilterDropDown
