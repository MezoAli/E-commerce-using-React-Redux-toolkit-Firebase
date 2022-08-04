import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./productSlice";
import { cartReducer } from "./cartSlice";
import { authReducer } from "./authSlice";
import { filterReducer } from "./filterSlice";

export const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
		auth: authReducer,
		filter: filterReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
