import React, { useState } from 'react'
import './CatalogGridHeadSorter.scss'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { setSorting } from '@/store/filters/slice/filters.slice'

type SortingOption = 'publishedAt' | 'price' | 'rating'
type SortingMethod = 'asc' | 'desc'
interface ICatalogGridHeadSorterProps {
	sortingOptions: SortingOption[]
	sortingMethods: SortingMethod[]
}
const CatalogGridHeadSorter: React.FC<ICatalogGridHeadSorterProps> = ({
	sortingOptions,
	sortingMethods
}) => {
	const dispatch = useAppDispatch()
	const [showOptions, setShowOptions] = useState<boolean>(false)

	const [sortingOption, setSortingOption] = useState<SortingOption>(
		sortingOptions[0]
	)
	const [sortingMethod, setSortingMethod] = useState<SortingMethod>(
		sortingMethods[0]
	)

	const handleOptionClick = (option: SortingOption) => {
		if (option === sortingOption) {
			// If the same option is clicked again, toggle the sorting method
			setSortingMethod(sortingMethod === 'asc' ? 'desc' : 'asc')
		} else {
			// If a different option is clicked, reset the sorting method to 'asc'
			setSortingMethod('asc')
			setSortingOption(option)
		}
		dispatch(setSorting({ sortingOption, sortingMethod }))
	}

	return (
		<div className='sorter'>
			<div
				className='sorter__head'
				onClick={() => setShowOptions(!showOptions)}
			>
				{sortingOption}
				{sortingMethod}
				<div className={`sorter__head-arrow ${showOptions && 'active'}`}></div>
			</div>
			<div className='sorter__options'>
				{sortingOptions.map((option, index) => (
					<div
						key={index}
						className={`sorter__option ${showOptions && 'active'}`}
						onClick={() => handleOptionClick(option)}
					>
						{option}
					</div>
				))}
			</div>
		</div>
	)
}

export default CatalogGridHeadSorter
