import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IFavoritesData {
	products: number[]
}

const initialState: IFavoritesData = {
	products: [323, 327, 311, 322]
}

const favoritesData = createSlice({
	name: 'favoritesData',
	initialState,
	reducers: {
		addFavorite: (state, action: PayloadAction<number>) => {
			const productId = action.payload
			if (!state.products.includes(productId)) {
				state.products.push(productId)
				console.log(state.products)
			}
		},
		removeFavorite: (state, action: PayloadAction<number>) => {
			const productId = action.payload
			const index = state.products.indexOf(productId)
			if (index !== -1) {
				state.products.splice(index, 1)
			}
		}
	}
})

export const { addFavorite, removeFavorite } = favoritesData.actions

export default favoritesData.reducer
