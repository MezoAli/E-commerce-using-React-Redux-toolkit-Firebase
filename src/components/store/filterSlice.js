import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	filteredProducts: [],
};

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		filterBySearch(state, action) {
			const { products, search } = action.payload;
			const tempProducts = products.filter(
				(item) =>
					item.title.toLowerCase().includes(search.toLowerCase()) ||
					item.category.toLowerCase().includes(search.toLowerCase()) ||
					item.company.toLowerCase().includes(search.toLowerCase())
			);
			state.filteredProducts = tempProducts;
		},
		filterByCategory(state, action) {
			const { products, category } = action.payload;
			let tempProducts = [];
			if (category === "All") {
				tempProducts = products;
			} else {
				tempProducts = products.filter((item) => {
					return item.category === category;
				});
			}

			state.filteredProducts = tempProducts;
		},
		filterByPrice(state, action) {
			const { products, price } = action.payload;
			const tempProducts = products.filter((item) => {
				return item.price <= price;
			});
			state.filteredProducts = tempProducts;
		},
		clearFilter(state, action) {
			state.filteredProducts = action.payload;
		},
	},
});

export const filterActions = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
