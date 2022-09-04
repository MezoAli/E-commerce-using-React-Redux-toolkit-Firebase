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
			console.log(action.payload);
		},
		addBillingAdress(state, action) {
			console.log(action.payload);
			state.billingAdress = action.payload;
		},
	},
});

export const checkoutActions = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
