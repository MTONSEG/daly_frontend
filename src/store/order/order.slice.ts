'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IBasketData {
	order: {
		name: string
		surname: string
		email: string | undefined
		phoneNumber: number | undefined
		paymentMethod: string
		deliveryType: string
		deliveryTown: string | null
		deliveryDate: string | null
		deliveryTime: string | null
		deliveryAddress: string | null
		deliveryApartment: string | null
		deliveryComment: string | null
	}
}

const initialState: IBasketData = {
	order: {
		name: '',
		surname: '',
		email: '',
		phoneNumber: undefined,
		paymentMethod: '',
		deliveryType: '',
		deliveryTown: null,
		deliveryDate: null,
		deliveryTime: null,
		deliveryAddress: null,
		deliveryApartment: null,
		deliveryComment: null
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
				deliveryTown: string | null
				deliveryDate: string | null
				deliveryTime: string | null
				deliveryAddress: string | null
				deliveryApartment: string | null
				deliveryComment: string | null
			}>
		) => {
			state.order.deliveryType = action.payload.deliveryType
			state.order.deliveryTown = action.payload.deliveryTown
			state.order.deliveryDate = action.payload.deliveryDate
			state.order.deliveryTime = action.payload.deliveryTime
			state.order.deliveryAddress = action.payload.deliveryAddress
			state.order.deliveryApartment = action.payload.deliveryApartment
			state.order.deliveryComment = action.payload.deliveryComment
		}
	}
})

export const { fillPersonalData, fillPaymentData,fillDeliveryData } = orderData.actions

export default orderData.reducer
