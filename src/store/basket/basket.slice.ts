'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
		addProduct: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload
			const existingProduct = state.products.find((product) => product.id === id)
			if (existingProduct) {
				existingProduct.quantity++
			} else {
				state.products.push({ id, quantity: 1 })
			}
		},
		removeProduct: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload
			const existingProductIndex = state.products.findIndex((product) => product.id === id)

			console.log('removed one:' + state.products)
			if (!existingProductIndex) return
			const existingProduct = state.products[existingProductIndex]
			if (existingProduct.quantity === 1) {
				state.products.splice(existingProductIndex, 1)
			}
			existingProduct.quantity--
		},
		deleteProduct: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload
			state.products = state.products.filter((product) => product.id !== id)
		},

	}
})

export const { addProduct, removeProduct,deleteProduct } = basketData.actions

export default basketData.reducer
