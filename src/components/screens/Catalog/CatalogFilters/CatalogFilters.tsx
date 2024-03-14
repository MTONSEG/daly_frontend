'use client'
import React, { useEffect, useState } from 'react'
import './CatalogFilters.scss'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import {
	fetchAllFilters,
	updateStateFilters
} from '@/store/filters/slice/filters.slice'
import { IFilter } from '@/types/types'
import FilterDropdown from './FilterDropdown/FilterDropdown'
import { useTranslations } from 'next-intl'

interface Props {}

const CatalogFilters: React.FC<Props> = ({}) => {
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

	const handleUpdateFilters = () => {
		dispatch(updateStateFilters(filters))
	}
	return (
		<>
			<div className='catalog-filters'>
				{filters.length > 0 &&
					filters.map((filter, index) => (
						<FilterDropdown
							filter={filter}
							updateFilter={updateFilter}
							key={index}
						/>
					))}
				<div className='catalog-filters__buttons'>
					<div
						className='catalog-filters__button'
						onClick={handleUpdateFilters}
					>
						{word('save-filters-button')}
					</div>
					<div
						className='catalog-filters__button'
						onClick={() => {
							dispatch(fetchAllFilters(locale))
						}}
					>
						{word('default-filters-button')}
					</div>
				</div>
			</div>
		</>
	)
}

export default CatalogFilters
