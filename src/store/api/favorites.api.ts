import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '@/types/types'

// Define the API service
export const favoritesApi = createApi({
	reducerPath: 'favoritesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/' }),
	endpoints: (builder) => ({
		fetchFavoritesData: builder.query<IProduct[], number[]>({
			query: (ids) => {
				const queryString = ids.map((id, index) => `filters[id][$in][${index}]=${id}`).join('&')
				return `products?${queryString}&populate=images,properties,category,brand,product_comments&populate[2]=localizations.images,localizations.properties,localizations.category,localizations.brand,localizations.product_comments`
			}
		})
	})
})

// Export hooks for usage in functional components
export const { useFetchFavoritesDataQuery } = favoritesApi

// Slice to manage the favorite products state
import { createSlice } from '@reduxjs/toolkit'

interface FavoritesState {
	favorites: IProduct[] | null
	loading: boolean
	error: null | string
}

const initialState: FavoritesState = {
	favorites: null,
	loading: false,
	error: null
}

const favoritesDataSlice = createSlice({
	name: 'favoritesData',
	initialState,
	reducers: {
		setFavoritesData: (state, action) => {
			state.favorites = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(favoritesApi.endpoints.fetchFavoritesData.matchPending, (state) => {
			state.loading = true
			state.error = null
		})
		builder.addMatcher(
			favoritesApi.endpoints.fetchFavoritesData.matchFulfilled,
			(state, action) => {
				state.favorites = action.payload
				state.loading = false
			}
		)
		builder.addMatcher(favoritesApi.endpoints.fetchFavoritesData.matchRejected, (state, action) => {
			state.loading = false
			state.error = action.error?.message ?? 'Failed to fetch favorites'
		})
	}
})

export const { setFavoritesData } = favoritesDataSlice.actions
export default favoritesDataSlice.reducer
