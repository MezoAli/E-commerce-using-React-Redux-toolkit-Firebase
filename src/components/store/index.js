import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./productSlice";
import { cartReducer } from "./cartSlice";
import { authReducer } from "./authSlice";
import { filterReducer } from "./filterSlice";
import { checkoutReducer } from "./checkoutSlice";

export const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
		auth: authReducer,
		filter: filterReducer,
		checkout: checkoutReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
