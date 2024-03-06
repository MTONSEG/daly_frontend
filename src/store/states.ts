import { IFilter, IProduct } from "@/types/types"

export interface IFiltersState {
	filtersData: IFilter[]
	error: null | string
	status: 'start' | 'loading' | 'error' | 'success'
}

export const filtersState: IFiltersState = {
	filtersData: [],
	error: null,
	status: 'start'
}

export interface ICatalogProductsState {
	catalogProducts: IProduct[]
	error: null | string
	status: 'start' | 'loading' | 'error' | 'success'
}

export const catalogProductsState: ICatalogProductsState = {
	catalogProducts: [],
	error: null,
	status: 'start'
}

