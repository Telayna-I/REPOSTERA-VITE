import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	board: [],
	tab: "orders",
	isLoading: false,
	orderToEdit: {},
	changes: false,
	tracked: {
		name: "",
		finished: false,
	},
};

export const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		startLoadingBoard: (state) => {
			state.isLoading = true;
		},
		setBoard: (state, action) => {
			state.isLoading = false;
			state.board = action.payload.board;
		},
		setEdit: (state) => {
			state.edit = !state.edit;
		},
		setChanges: (state, action) => {
			state.tab = action.payload ? action.payload : state.tab;
			state.changes = !state.changes;
		},
		tracking: (state, action) => {
			state.isLoading = false;
			state.tracked.name = action.payload.name;
			state.tracked.finished = action.payload.finished;
		},
		saveOrder: (state, { payload }) => {
			state.orderToEdit = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	startLoadingBoard,
	setBoard,
	setEdit,
	setChanges,
	tracking,
	saveOrder,
} = boardSlice.actions;
export default boardSlice.reducer;
