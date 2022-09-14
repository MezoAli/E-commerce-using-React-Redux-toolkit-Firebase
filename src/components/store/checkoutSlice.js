import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	shippingAdress: {},
	billingAdress: {},
};

const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {
		addShippingAdress(state, action) {
			state.shippingAdress = action.payload;
		},
		addBillingAdress(state, action) {
			state.billingAdress = action.payload;
		},
	},
});

export const checkoutActions = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
