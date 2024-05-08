'use client'

import { IProduct } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OrderProductsSets {
	productsSets: {
		id: number
		quantity: number
	}[]
}

export interface IOrderData {
	order: {
		name: string | undefined
		surname: string | undefined
		email: string | undefined
		phoneNumber: number | undefined
		paymentMethod: string | undefined
		deliveryType: string | undefined
		deliveryTown: string | undefined
		deliveryDate: string | undefined
		deliveryTime: string | undefined
		deliveryAddress: string | undefined
		deliveryApartment: string | undefined
		deliveryComment: string | undefined
		productsData: IProduct[] | undefined
		productsSets:
			| undefined
			| {
					id: number
					quantity: number
			  }[]
	}
}

const initialState: IOrderData = {
	order: {
		name: undefined,
		surname: undefined,
		email: undefined,
		phoneNumber: undefined,
		paymentMethod: undefined,
		deliveryType: undefined,
		deliveryTown: undefined,
		deliveryDate: undefined,
		deliveryTime: undefined,
		deliveryAddress: undefined,
		deliveryApartment: undefined,
		deliveryComment: undefined,
		productsData: undefined,
		productsSets: undefined
	}
}

const orderData = createSlice({
	name: 'orderData',
	initialState,
	reducers: {
		fillPersonalData: (
			state,
			action: PayloadAction<{
				name: string
				surname: string
				email: string | undefined
				phoneNumber: number | undefined
			}>
		) => {
			state.order.name = action.payload.name
			state.order.surname = action.payload.surname
			state.order.email = action.payload.email
			state.order.phoneNumber = action.payload.phoneNumber
		},
		fillPaymentData: (
			state,
			action: PayloadAction<{
				paymentMethod: string
			}>
		) => {
			state.order.paymentMethod = action.payload.paymentMethod
		},
		fillDeliveryData: (
			state,
			action: PayloadAction<{
				deliveryType: string
				deliveryTown: string | undefined
				deliveryDate: string | undefined
				deliveryTime: string | undefined
				deliveryAddress: string | undefined
				deliveryApartment: string | undefined
				deliveryComment: string | undefined
			}>
		) => {
			state.order.deliveryType = action.payload.deliveryType
			state.order.deliveryTown = action.payload.deliveryTown
			state.order.deliveryDate = action.payload.deliveryDate
			state.order.deliveryTime = action.payload.deliveryTime
			state.order.deliveryAddress = action.payload.deliveryAddress
			state.order.deliveryApartment = action.payload.deliveryApartment
			state.order.deliveryComment = action.payload.deliveryComment
		},
		fillProductsData: (
			state,
			action: PayloadAction<{
				productsData: IProduct[]
			}>
		) => {
			state.order.productsData = action.payload.productsData
		},
		fillProductsSets: (state, action: PayloadAction<OrderProductsSets>) => {
			state.order.productsSets = action.payload.productsSets
		}
	}
})

export const {
	fillPersonalData,
	fillPaymentData,
	fillDeliveryData,
	fillProductsData,
	fillProductsSets
} = orderData.actions

export default orderData.reducer
