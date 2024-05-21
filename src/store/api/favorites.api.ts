import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IProduct } from '@/types/types'

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

export const fetchFavoritesData = createAsyncThunk<IProduct[], number[], { rejectValue: string }>(
	'favoritesData/fetchFavoritesData',

	async function (ids, { rejectWithValue }) {
		const queryString = ids.map((id, index) => `filters[id][$in][${index}]=${id}`).join('&')
		const response = await axios.get(`http://localhost:1337/api/products?${queryString}&populate=images,properties,category,brand,product_comments&populate[2]=localizations.images,localizations.properties,localizations.category,localizations.brand,localizations.product_comments`)
		
		
		if (response.status !== 200) {
			return rejectWithValue('Server error !')
		}
		const responseData = response.data.data
		return responseData
	}
)

const favoritesDataSlice = createSlice({
	name: 'favoritesData',
	initialState,
	reducers: {
		setFavoritesData: (state, action) => {
			state.favorites = action.payload
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchFavoritesData.pending, (state) => {
				state.loading = true
				state.error = null
			})

			.addCase(fetchFavoritesData.fulfilled, (state, action) => {
				state.favorites = action.payload
				state.loading = false
			})
	}
})

export const { setFavoritesData } = favoritesDataSlice.actions
export default favoritesDataSlice.reducer
