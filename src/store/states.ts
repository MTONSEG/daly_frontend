import { IFilter, IMetaData, IProduct } from '@/types/types'

export interface IFiltersState {
	filtersData: IFilter[]
	sortingOption: 'publishedAt' | 'price' | 'rating'
	sortingMethod: 'asc' | 'desc'
	page: number
    limit: number
	error: null | string
	status: 'start' | 'loading' | 'error' | 'success'
}

export const filtersState: IFiltersState = {
	filtersData: [],
	sortingOption: 'publishedAt',
	sortingMethod: 'asc',
	page: 1,
    limit: 20,
	error: null,
	status: 'start'
}

export interface ICatalogProductsState {
	catalogProducts: IProduct[]
	meta: IMetaData
	gridMode: 'card' | 'row'
	error: null | string
	status: 'start' | 'loading' | 'error' | 'success'
}

export const catalogProductsState: ICatalogProductsState = {
	catalogProducts: [],
	meta: {
		pagination: {
			page: 1,
			pageSize: 8,
			pageCount: 9,
			total: 36
		}
	},
	gridMode: 'card',
	error: null,
	status: 'start'
}
