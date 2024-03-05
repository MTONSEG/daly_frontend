import { searchProduct } from '@/store/header/header.api'
import type { IHeaderState } from '@/types/header/header.types'
import { ISelectOption } from '@/types/types'
import { formatOption } from '@/utils/formatOption'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IHeaderState = {
	searchList: [],
	searchValue: null,
	searchInputValue: ''
}

const headerSlice = createSlice({
	name: 'header-slice',
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<ISelectOption | null>) {
			state.searchValue = action.payload
		},
		setSearchInputValue(state, action: PayloadAction<string>) {
			state.searchInputValue = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(searchProduct.fulfilled, (state, action) => {
			if (!action.payload) return

			state.searchList = action.payload.map((el) =>
				formatOption(el.attributes.title, String(el.id))
			)
		})
	}
})

export type HeaderActions = typeof headerSlice.actions
export default headerSlice.reducer
export const { reducer: headerReducer, actions: headerActions } = headerSlice
