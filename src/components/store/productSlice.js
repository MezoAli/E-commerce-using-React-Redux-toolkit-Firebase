import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	productsList: [],
	filteredProducts: [],
};

const products = createSlice({
	name: "products",
	initialState,
	reducers: {
		addProducts(state, action) {
			state.productsList = action.payload.products;
		},
		filterProducts: (state, action) => {
			state.filteredProducts = state.productsList;
			const newArr = [...state.productsList].filter(
				(product) => product.category === action.payload
			);
			state.filteredProducts = newArr;
		},
		getAllProducts: (state) => {
			state.filteredProducts = state.productsList;
		},
	},
});

export const productsReducer = products.reducer;
export const productsActions = products.actions;
