import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	orderHistory: [],
	orderTotalAmounts: 0,
};

const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		ADD_ORDERS_HISTORY(state, action) {
			state.orderHistory = action.payload;
		},
		CALC_TOTAL_EARNINGS(state, _) {
			const array = [];
			state.orderHistory.forEach((item) => {
				return array.push(item.cartTotalAmount);
			});
			state.orderTotalAmounts = array.reduce((acc, item) => {
				return acc + item;
			}, 0);
		},
	},
});

export const orderActions = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
