'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IFilter, IResponse } from '@/types/types'
import { RootState } from '../../store'
import { getData } from '@/services/axios.config'
import { filtersState } from '@/store/states'

export const fetchAllFilters = createAsyncThunk<
	IFilter[],
	string | string[],
	{ state: RootState; rejectValue: string }
>('filtersData/fetchAllFilters', async (locale, { rejectWithValue }) => {
	try {
		const data = await getData<IResponse<IFilter[]>>(
			`filters?locale=${locale}&populate[0]=options&populate[1]=categories.category&populate[2]=brands.brand`
		)

		return data.data
	} catch (error: any) {
		console.error('Error getting all product data:', error)
		return rejectWithValue(error)
	}
})

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
			state.sortingMethod=action.payload.sortingMethod
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
				// console.log('🚀 SUCCESSSSSSSSSSSSSSSSS', state.filtersData)
			})

			.addCase(fetchAllFilters.rejected, (state) => {
				state.status = 'error'
				state.error = 'Cant throw you a good error('
			})
	}
})

export const { updateStateFilters, setSorting } = filtersData.actions

export default filtersData.reducer
