import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
	"products/getProducts",
	async () => {
		const response = await fetch("https://fakestoreapi.com/products");
		const data = await response.json();
		return data;
	}
);

const products = createSlice({
	name: "products",
	initialState: {
		productsList: [],
		filteredProducts: [],
		isLoading: false,
	},
	reducers: {
		filterProducts: (state, action) => {
			state.filteredProducts = state.productsList;
			console.log(state);
			const newArr = [...state.productsList].filter(
				(product) => product.category === action.payload
			);
			state.filteredProducts = newArr;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.isLoading = false;
			state.productsList = action.payload;
			state.filteredProducts = action.payload;
		});
	},
});

export const productsReducer = products.reducer;
export const productsActions = products.actions;
