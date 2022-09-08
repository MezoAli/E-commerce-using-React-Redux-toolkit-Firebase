import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	orderHistory: [],
};

const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		ADD_ORDERS_HISTORY(state, action) {
			state.orderHistory = action.payload;
			console.log(action.payload);
		},
	},
});

export const orderActions = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
