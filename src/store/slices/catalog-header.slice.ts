import { createSlice } from '@reduxjs/toolkit'

interface ICatalogHeaderState {
	list: []
}

const initialState: StateType = {
	list: []
}

const catalogHeaderSlice = createSlice({
	name: '',
	initialState,
	reducers: {},
})

export default catalogHeaderSlice.reducer
export const { reducer: catalogHeaderReducer, actions: catalogHeaderActions } =
	catalogHeaderSlice
