import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
	"categories/getCategories",
	async () => {
		const res = await fetch("https://fakestoreapi.com/products/categories");
		const data = await res.json();
		return data;
	}
);

const CategoriesSlice = createSlice({
	name: "categories",
	initialState: {
		categoriesList: [],
		isLoading: false,
	},
	extraReducers: (builder) => {
		builder.addCase(getCategories.fulfilled, (state, action) => {
			state.categoriesList = action.payload;
		});
	},
});

export const categoriesReducer = CategoriesSlice.reducer;
