import { ISelectOption } from '@/types/types'

export interface IHeaderState {
	searchList: ISelectOption[]
	searchValue: ISelectOption | null
	searchInputValue: string
}
