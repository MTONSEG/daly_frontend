import React, { useState } from 'react'
import './GridHeadSorter.scss'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { setSorting } from '@/store/filters/slice/filters.slice'
import { useTranslations } from 'next-intl'
import useOutsideClick from '@/hooks/useOutSideClick'
import Arrow from '@/components/ui/arrows/Arrow'
import { useSearchParams } from 'next/navigation'

type SortingOption = 'publishedAt' | 'price' | 'rating'
type SortingMethod = 'asc' | 'desc'

interface IGridHeadSorterProps {
	sortingOptions: SortingOption[]
	sortingMethods: SortingMethod[]
}

const GridHeadSorter: React.FC<IGridHeadSorterProps> = ({ sortingOptions, sortingMethods }) => {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)
	const word = useTranslations('sorting')
	const dispatch = useAppDispatch()
	const urlParams = useSearchParams()
	const urlSortingOption: 'publishedAt' | 'price' | 'rating' = urlParams.get('sorting') as
		| 'publishedAt'
		| 'price'
		| 'rating'
	const urlSortingMethod = 'desc'
	const [sortingOption, setSortingOption] = useState<SortingOption>(
		urlSortingOption ? urlSortingOption : sortingOptions[0]
	)
	const [sortingMethod, setSortingMethod] = useState<SortingMethod>(
		urlSortingOption ? urlSortingMethod : sortingMethods[0]
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
		<div className='sorter' ref={ref}>
			<div
				className='sorter__head'
				onClick={() => setIsActive(!isActive)}
				aria-label='sort-drop-head'
			>
				{word(sortingOption)}
				<Arrow state={isActive} />
			</div>
			<div className={`sorter__options ${isActive && 'active'}`}>
				{sortingOptions.map((option, index) => (
					<div
						key={index}
						className={`sorter__option ${sortingOption === option && 'active'}`}
						onClick={() => handleOptionClick(option)}
					>
						{word(option)}
						{sortingOption === option && <Arrow state={sortingMethod === 'asc' ? true : false} />}
					</div>
				))}
			</div>
		</div>
	)
}

export default GridHeadSorter
