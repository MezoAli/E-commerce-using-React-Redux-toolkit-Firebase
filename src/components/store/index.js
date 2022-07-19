import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categoriesSlice";
import { productsReducer } from "./productSlice";
import { cartReducer } from "./cartSlice";

export const store = configureStore({
	reducer: {
		products: productsReducer,
		categories: categoriesReducer,
		cart: cartReducer,
	},
});
