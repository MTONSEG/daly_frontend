'use client'

import { IProduct } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createOrder } from '../api/order.api'

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
		phoneNumber: string | undefined
		paymentMethod: string | undefined
		deliveryType: string | undefined
		deliveryTown: string | undefined
		deliveryDate: string | undefined
		deliveryTime: string | undefined
		deliveryAddress: string | undefined
		productsData: IProduct[] | undefined
		productsSets:
			| undefined
			| {
					id: number
					quantity: number
			}[]
	},
	status: 'idle' | 'loading' | 'succeeded' | 'failed',
	error: string | null // Добавлено поле error для обработки ошибок
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
		productsData: undefined,
		productsSets: undefined
	},
	status: 'idle',
	error: null // Инициализация поля error
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
				phoneNumber: string | undefined
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
				deliveryTown?: string | undefined
				deliveryDate?: string | undefined
				deliveryTime?: string | undefined
				deliveryAddress?: string | undefined
			}>
		) => {
			if (action.payload.deliveryType === 'delivery') {
				state.order.deliveryType = action.payload.deliveryType
				state.order.deliveryTown = action.payload.deliveryTown
				state.order.deliveryDate = action.payload.deliveryDate
				state.order.deliveryTime = action.payload.deliveryTime
				state.order.deliveryAddress = action.payload.deliveryAddress
			} else {
				state.order.deliveryType = action.payload.deliveryType
			}
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
		},
		resetStatus: (state) => {
			state.status = initialState.status
		}
	},

	extraReducers: (builder) => {
		builder
		  .addCase(createOrder.pending, (state) => {
			state.status = 'loading';
			state.error = null;
		  })
		  .addCase(createOrder.fulfilled, (state ) => {
			state.status = 'succeeded';
			state.order = initialState.order; 
			state.status = initialState.status// Очистка заказа после успешного выполнения
		  })
		  .addCase(createOrder.rejected, (state, action) => {
			state.status = 'failed';
			state.error = action.payload as string; // Приведение типа error к string
		  });
	  },
})

export const {
	fillPersonalData,
	fillPaymentData,
	fillDeliveryData,
	fillProductsData,
	fillProductsSets,
	resetStatus
} = orderData.actions

export default orderData.reducer
