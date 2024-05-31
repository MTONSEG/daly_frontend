'use client'
import { createSlice } from '@reduxjs/toolkit'
import { IFilter } from '@/types/types'
import { filtersState } from '@/store/states'
import { fetchAllFilters } from '../filters.api'

const filtersData = createSlice({
	name: 'filtersData',
	initialState: filtersState,
	reducers: {
		updateStateFilters: (state, action: { payload: IFilter[] }) => {
			state.filtersData = action.payload
		},
		setSorting: (
			state,
			action: {
				payload: {
					sortingOption: 'publishedAt' | 'price' | 'rating'
					sortingMethod: 'asc' | 'desc'
				}
			}
		) => {
			state.sortingOption = action.payload.sortingOption
			state.sortingMethod = action.payload.sortingMethod
		},
		setPagination: (
			state,
			action: {
				payload: {
					page: number
					limit: number
					start?: number
				}
			}
		) => {
			state.page = action.payload.page
			state.limit = action.payload.limit
			if (action.payload.start !== undefined) {
				state.start = action.payload.start
			} else {
				state.start = undefined
			}
		}
	},

	extraReducers(builder) {
		builder
			.addCase(fetchAllFilters.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchAllFilters.fulfilled, (state, action) => {
				state.status = 'success'
				state.error = null
				state.filtersData = action.payload
				console.log('🚀 SUCCESSSSSSSSSSSSSSSSS', state.filtersData)
			})

			.addCase(fetchAllFilters.rejected, (state) => {
				state.status = 'error'
				state.error = 'Cant throw you a good error('
			})
	}
})

export const { updateStateFilters, setSorting, setPagination } =
	filtersData.actions

export default filtersData.reducer
