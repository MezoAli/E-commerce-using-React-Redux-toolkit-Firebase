import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
	isLoggedIn: false,
	email: "",
	userName: "",
	userId: "",
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		SET_ACTIVE_USER: (state, action) => {
			state.isLoggedIn = true;
			state.email = action.payload.email;
			state.userName = action.payload.userName;
			state.userId = action.payload.userId;
			console.log(state);
		},
		REMOVE_ACTIVE_USER: (state, _) => {
			state.isLoggedIn = false;
			state.email = "";
			state.userName = "";
			state.userId = "";
			console.log(state);
		},
	},
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
