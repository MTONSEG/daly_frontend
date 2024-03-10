'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { IProduct, IFilter } from '@/types/types'
import { useParams } from 'next/navigation'
import { fetchAllFilters } from '@/store/filters/slice/filters.slice'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import CatalogContent from './CatalogContent'
import FilterDropdown from '@/components/screens/Catalog/CatalogFilters/FilterDropdown/FilterDropdown'

const Catalog: React.FC = () => {
    //state of the filters copy from redux
	const [filters, setFilters] = useState<IFilter[]>([]) 
	const dispatch: any = useAppDispatch()
    const { locale } = useParams()
    //getting filters copy from redux
	const filtersFromRedux = useAppSelector((state) => state.filters.filtersData)
	console.log('🚀 ~ filtersFromRedux:', filtersFromRedux)
    //getting the filters from strapi !!!!!!!!!! make localStorage save for filters
	useEffect(() => {
		dispatch(fetchAllFilters(locale))
		console.log('Fetched the filters')
	}, [locale])
    //setting the copied filters to the copy storage
	useEffect(() => {
		const copiedFilters = filtersFromRedux.map((filter) => ({ ...filter }))
		setFilters(copiedFilters)
	}, [filtersFromRedux])
    //func for filter update
	const updateFilter = (updatedFilter: IFilter) => {
		const index = filters.findIndex((filter) => filter.id === updatedFilter.id)
		if (index !== -1) {
			const updatedFilters = [...filters]
			updatedFilters[index] = updatedFilter
			setFilters(updatedFilters)
		}
	}

	return (
		<>
			{filters.length > 0 &&
				filters.map((filter, index) => (
					<FilterDropdown
						filter={filter}
						updateFilter={updateFilter}
						key={index}
					/>
				))}
			<CatalogContent filters={filters} locale={locale} />
		</>
	)
}

export default Catalog
