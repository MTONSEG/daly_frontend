import { IFilter } from "@/types/types"

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
