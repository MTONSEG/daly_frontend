'use client'

import { createSlice } from '@reduxjs/toolkit'

export interface IBasketData {
	products: {
		id: number
		quantity: number
	}[]
}

const initialState: IBasketData = {
	products: []
}

const basketData = createSlice({
	name: 'basketData',
	initialState,
	reducers: {
		addProduct: (state, action) => {
			const productToPush = action.payload.id
			if (
				state.products.find((product) => {
					product.id === productToPush.id
				})
			) {
			}
			state.products.push(productToPush)
		},
		removeProduct: (state, action) => {}
	}
})

export const { addProduct, removeProduct } = basketData.actions

export default basketData.reducer
