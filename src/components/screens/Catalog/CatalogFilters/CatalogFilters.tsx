'use client'
import React, { useEffect, useState } from 'react'
import './CatalogFilters.scss'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { updateStateFilters } from '@/store/filters/slice/filters.slice'

import { IFilter } from '@/types/types'
import FilterDropdown from './FilterDropdown/FilterDropdown'
import { useTranslations } from 'next-intl'
import useOutsideClick from '@/hooks/useOutSideClick'
import { fetchAllFilters } from '@/store/filters/filters.api'
import TransparentBtn from '@/components/ui/buttons/TransparentBtn/TransparentBtn'
import Loader from '@/components/ui/loaders/Loader'

// probalbe dynamic import
import { FilterMobileIcon } from '@/components/ui/icons'

interface Props {}

const CatalogFilters: React.FC<Props> = ({}) => {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)

	const word = useTranslations('catalog')
	const { locale } = useParams()
	//state of the filters copy from redux
	const [filters, setFilters] = useState<IFilter[]>([])
	console.log('🚀 ~ filters:', filters)
	const dispatch: any = useAppDispatch()
	//getting filters copy from redux
	const filtersFromRedux = useAppSelector((state) => state.filters.filtersData)
	console.log('🚀 ~ filtersFromRedux:', filtersFromRedux)
	//getting the filters from strapi !!!!!!!!!! make localStorage save for filters
	useEffect(() => {
		dispatch(fetchAllFilters(locale))
		console.log('Fetched default filters and their names')
	}, [locale])
	//setting the copied filters to the copy storage
	useEffect(() => {
		const copiedFilters = filtersFromRedux.map((filter: IFilter) => ({
			...filter
		}))
		setFilters(copiedFilters)
	}, [filtersFromRedux])

	//func for filter update
	const updateFilter = (updatedFilter: IFilter) => {
		setFilters((prevFilters) => {
			const index = prevFilters.findIndex(
				(filter) => filter.id === updatedFilter.id
			)
			if (index !== -1) {
				const updatedFilters = [...prevFilters]
				updatedFilters[index] = updatedFilter
				return updatedFilters
			}
			return prevFilters
		})
	}

	useEffect(() => {
		if (isActive && window.innerWidth < 768) {
			document.body.classList.add('open')
		} else {
			document.body.classList.remove('open')
		}
	}, [isActive])

	const handleUpdateFilters = () => {
		dispatch(updateStateFilters(filters))
	}
	return (
		<>
			{!isActive && (
				<div
					className='catalog-filters__mobile-button'
					onClick={() => {
						setIsActive(true)
					}}
				>
					<FilterMobileIcon className='catalog-filters__mobile-icon' />
				</div>
			)}
			<div className={`catalog-filters ${isActive && 'active'}`} ref={ref}>
				{filters.length > 0 ? (
					filters.length > 0 &&
					filters.map((filter, index) => (
						<FilterDropdown
							filter={filter}
							updateFilter={updateFilter}
							key={index}
						/>
					))
				) : (
					<Loader />
				)}
				<div className='catalog-filters__buttons'>
					<TransparentBtn
						onClick={() => {
							handleUpdateFilters()
							setIsActive(false)
						}}
					>
						{word('save-filters-button')}
					</TransparentBtn>
					<TransparentBtn
						onClick={() => {
							dispatch(fetchAllFilters(locale))
							setIsActive(false)
						}}
					>
						{word('default-filters-button')}
					</TransparentBtn>
				</div>
			</div>
		</>
	)
}

export default CatalogFilters
