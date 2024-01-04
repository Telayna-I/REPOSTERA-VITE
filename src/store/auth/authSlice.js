import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: JSON.parse(localStorage.getItem("user"))
		? "authenticated"
		: "checking", // 'checking', 'not-authenticated','authenticated'
	user: JSON.parse(localStorage.getItem("user")) || {},
	errorMessage: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		checkingCredential: (state, action) => {
			state.status = "checking";
			state.user = {};
			state.errorMessage = undefined;
		},

		logIn: (state, { payload }) => {
			state.status = "authenticated";
			state.user = payload;
			state.errorMessage = undefined;
		},

		logOut: (state, { payload }) => {
			state.status = "not-authenticated";
			state.user = {};
			state.errorMessage = payload;
		},
		setErrMessage: (state, { payload }) => {
			state.errorMessage = payload;
		},
	},
});

export const { logIn, logOut, checkingCredential, setErrMessage } =
	authSlice.actions;
export default authSlice.reducer;
