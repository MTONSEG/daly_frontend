import { IFilter, IProduct } from '@/types/types'

export interface IFiltersState {
	filtersData: IFilter[]
	sortingOption: 'publishedAt' | 'price' | 'rating'
	sortingMethod: 'asc' | 'desc'

	error: null | string
	status: 'start' | 'loading' | 'error' | 'success'
}

export const filtersState: IFiltersState = {
	filtersData: [],
	sortingOption: 'publishedAt',
	sortingMethod: 'asc',
	error: null,
	status: 'start'
}

export interface ICatalogProductsState {
	catalogProducts: IProduct[]
	gridMode: 'card' | 'row'
	error: null | string
	status: 'start' | 'loading' | 'error' | 'success'
}

export const catalogProductsState: ICatalogProductsState = {
	catalogProducts: [],
	gridMode: 'card',
	error: null,
	status: 'start'
}