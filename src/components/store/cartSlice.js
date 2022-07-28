import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: [],
		cartTotalQuantaty: 0,
		cartTotalBalance: 0,
		previosURL: "",
	},
	reducers: {
		addToCart: (state, action) => {
			const findIndexOfProduct = state.cartItems.findIndex(
				(product) => product.id === action.payload.id
			);
			if (findIndexOfProduct >= 0) {
				state.cartItems[findIndexOfProduct].quantaty += 1;
			} else {
				const tempProduct = { ...action.payload, quantaty: 1 };
				state.cartItems.push(tempProduct);
			}
			toast.success(`${action.payload.title} Added Successfuly to Cart`, {
				position: toast.POSITION.BOTTOM_LEFT,
			});
			// state.cartTotalQuantaty = state.cartItems.reduce((acc, item) => {
			// 	return (item.quantaty += acc);
			// }, 0);
			// state.cartTotalBalance = state.cartItems.reduce((acc, item) => {
			// 	return (item.price += acc);
			// }, 0);
		},
		removeFromCart: (state, action) => {
			const filteredArr = state.cartItems.filter((item) => {
				return item.id !== action.payload.id;
			});
			state.cartItems = filteredArr;
			toast.error(`${action.payload.title} is Removed from Cart`, {
				position: toast.POSITION.BOTTOM_LEFT,
			});
		},
		removeAllCartItems: (state) => {
			state.cartItems = [];
			// state.cartTotalQuantaty = 0;
			// state.cartTotalBalance = 0;
			toast.warn(`Cart is cleared`, {
				position: toast.POSITION.BOTTOM_LEFT,
			});
		},
		increaseItemQuantaty: (state, action) => {
			const findIndexOfProduct = state.cartItems.findIndex(
				(product) => product.id === action.payload.id
			);
			state.cartItems[findIndexOfProduct].quantaty += 1;
			toast.success(`${action.payload.title} Amount is increased`, {
				position: toast.POSITION.BOTTOM_LEFT,
			});
			// state.cartTotalQuantaty = state.cartItems.reduce((acc, item) => {
			// 	return (item.quantaty += acc);
			// }, 0);
			// state.cartTotalBalance = state.cartItems.reduce((acc, item) => {
			// 	return (item.price += acc);
			// }, 0);
		},
		decreaseItemQuantaty: (state, action) => {
			const findIndexOfProduct = state.cartItems.findIndex(
				(product) => product.id === action.payload.id
			);

			if (state.cartItems[findIndexOfProduct].quantaty > 1) {
				state.cartItems[findIndexOfProduct].quantaty -= 1;
				toast.warn(`${action.payload.title} Amount is decreased`, {
					position: toast.POSITION.BOTTOM_LEFT,
				});
			} else if (state.cartItems[findIndexOfProduct].quantaty === 1) {
				const filteredArr = state.cartItems.filter(
					(item) => item.id !== action.payload.id
				);
				state.cartItems = filteredArr;
				toast.error(`${action.payload.title} is Removed from Cart`, {
					position: toast.POSITION.BOTTOM_LEFT,
				});
			}
		},
		handleQuantatyAndTotals: (state, action) => {
			let { quantaty, total } = state.cartItems.reduce(
				(totals, item) => {
					const { price, quantaty } = item;
					const totalPrice = price * quantaty;

					totals.quantaty += quantaty;
					totals.total += totalPrice;

					return totals;
				},
				{
					quantaty: 0,
					total: 0,
				}
			);
			state.cartTotalBalance = total;
			state.cartTotalQuantaty = quantaty;
		},
		setCartOnLogout: (state, _) => {
			state.cartTotalQuantaty = 0;
			state.cartItems = [];
			state.cartTotalBalance = 0;
		},
		setPreviousURL: (state, action) => {
			state.previosURL = action.payload;
		},
	},
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
