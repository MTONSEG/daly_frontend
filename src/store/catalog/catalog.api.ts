import { IProduct, IResponse } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getData } from "@/services/axios.config";

export const fetchFilteredProducts =
	createAsyncThunk <
	IResponse<IProduct[]>, string, { state: RootState; rejectValue: string }>(
		'catalogProducts/fetchFilteredProducts',
		async (url, { rejectWithValue }) => {
			try {
				const data = await getData<IResponse<IProduct[]>>(url)

				return data
			} catch (error: any) {
				console.error('Error getting all product data:', error)
				return rejectWithValue(error)
			}
		}
	)