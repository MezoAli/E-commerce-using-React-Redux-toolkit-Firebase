import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	productsList: [],
	minPrice: 0,
	maxPrice: 0,
};

const products = createSlice({
	name: "products",
	initialState,
	reducers: {
		addProducts(state, action) {
			state.productsList = action.payload;
		},
		getPriceRange(state, action) {
			const products = action.payload;
			const priceArray = [];
			products.map((item) => {
				const price = item.price;
				return priceArray.push(price);
			});
			state.minPrice = Math.min(...priceArray);
			state.maxPrice = Math.max(...priceArray);
		},
	},
});

export const productsReducer = products.reducer;
export const productsActions = products.actions;
