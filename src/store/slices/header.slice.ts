import { searchProduct } from '@/store/header/header.api'
import type { IHeaderState } from '@/types/header/header.types'
import { formatOption } from '@/utils/formatOption'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IHeaderState = {
	searchList: []
}

const headerSlice = createSlice({
	name: 'header-slice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(searchProduct.fulfilled, (state, action) => {
			if (!action.payload) return

			state.searchList = action.payload.map((el) =>
				formatOption(el.attributes.title, String(el.id))
			)
		})
	}
})
// export const {} = header.actions;
export default headerSlice.reducer
export const { reducer: headerReducer, actions: headerActions } = headerSlice
