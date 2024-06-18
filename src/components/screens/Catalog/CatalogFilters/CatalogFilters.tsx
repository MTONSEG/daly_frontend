'use client'
import React, { useEffect, useState, useCallback } from 'react'
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
import { useSearchParams } from 'next/navigation'

// probable dynamic import
import { FilterMobileIcon } from '@/components/ui/icons'

const CatalogFilters: React.FC = () => {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)
	const { locale } = useParams()
	const dispatch = useAppDispatch()
	const word = useTranslations('catalog')

	const filtersFromRedux = useAppSelector((state) => state.filters.filtersData)
	const [filters, setFilters] = useState<IFilter[]>([])
	const [isInitialized, setIsInitialized] = useState<boolean>(false)

	const urlParams = useSearchParams()
	const queryCategory = urlParams.get('category')
	const queryBrand = urlParams.get('brand')

	useEffect(() => {
		if (!queryCategory && !queryBrand) {
			dispatch(fetchAllFilters(locale))
		}
	}, [locale, dispatch, queryBrand, queryCategory])

	const initializeFilters = useCallback(
		(filters: IFilter[]) => {
			return filters.map((filter) => {
				const updatedCategories = filter.attributes.categories?.map((category) => {
					return category.category.data.attributes.name === queryCategory
						? { ...category, active: true }
						: category
				})

				const updatedBrands = filter.attributes.brands?.map((brand) => {
					return brand.brand.data.attributes.name === queryBrand
						? { ...brand, active: true }
						: brand
				})

				return {
					...filter,
					attributes: {
						...filter.attributes,
						categories: updatedCategories || filter.attributes.categories,
						brands: updatedBrands || filter.attributes.brands
					}
				}
			})
		},
		[queryCategory, queryBrand]
	)

	useEffect(() => {
		const handleUpdateFiltersFromUrl = (urlFilters: IFilter[]) => {
			dispatch(updateStateFilters(urlFilters))
			setIsActive(false)
		}

		if (filtersFromRedux.length === 0 && !isInitialized) {
			dispatch(fetchAllFilters(locale))
		}

		if (filtersFromRedux.length > 0 && !isInitialized) {
			const updatedFilters = initializeFilters([...filtersFromRedux])
			setFilters(updatedFilters)

			setIsInitialized(true)
			handleUpdateFiltersFromUrl(updatedFilters)
		}

		if (filtersFromRedux.length > 0 && !queryCategory && !queryBrand) {
			setFilters(filtersFromRedux)
		}
	}, [
		filtersFromRedux,
		isInitialized,
		queryCategory,
		queryBrand,
		locale,
		dispatch,
		initializeFilters,
		setIsActive
	])

	const updateFilter = useCallback((updatedFilter: IFilter) => {
		setFilters((prevFilters) => {
			const index = prevFilters.findIndex((filter) => filter.id === updatedFilter.id)
			if (index !== -1) {
				const updatedFilters = [...prevFilters]
				updatedFilters[index] = updatedFilter
				return updatedFilters
			}
			return prevFilters
		})
	}, [])

	useEffect(() => {
		if (isActive && window.innerWidth < 768) {
			document.body.classList.add('open')
		} else {
			document.body.classList.remove('open')
		}
	}, [isActive])

	const handleUpdateFilters = () => {
		dispatch(updateStateFilters(filters))
		setIsActive(false)
	}

	const handleFetchDefaultFilters = () => {
		dispatch(fetchAllFilters(locale))
		setIsActive(false)
	}

	return (
		<>
			{!isActive && (
				<section
					className='catalog-filters__mobile-button'
					onClick={() => {
						setIsActive(true)
					}}
				>
					<FilterMobileIcon className='catalog-filters__mobile-icon' />
				</section>
			)}
			<section className={`catalog-filters ${isActive ? 'active' : ''}`} ref={ref}>
				{filters.length > 0
					? filters.map((filter, index) => (
							<FilterDropdown filter={filter} updateFilter={updateFilter} key={index} />
					))
					: Array.from({ length: 11 }).map((_, index) => (
							<FilterDropdown
								updateFilter={updateFilter}
								key={index}
								isManuallyPrice={index === 0}
							/>
					))}
				<section className='catalog-filters__buttons'>
					<TransparentBtn onClick={handleUpdateFilters}>
						{word('save-filters-button')}
					</TransparentBtn>
					<TransparentBtn onClick={handleFetchDefaultFilters}>
						{word('default-filters-button')}
					</TransparentBtn>
				</section>
			</section>
		</>
	)
}

export default CatalogFilters
