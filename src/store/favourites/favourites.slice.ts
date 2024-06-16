import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IFavoritesData {
	products: number[]
}

const initialState: IFavoritesData = {
	// products: [323, 327, 311, 322]
	products: []
}

const favoritesData = createSlice({
	name: 'favoritesData',
	initialState,
	reducers: {
		addFavorite: (state, action: PayloadAction<number>) => {
			const productId = action.payload
			const index = state.products.indexOf(productId)

			if (index === -1) {
				// If the product ID does not exist, add it
				state.products.push(productId)
			} else {
				// If the product ID exists, remove it
				state.products.splice(index, 1)
			}

			console.log(state.products)
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
