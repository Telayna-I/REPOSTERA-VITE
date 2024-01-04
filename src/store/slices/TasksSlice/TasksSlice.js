import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	edit: false,
	changes: false,
	taskToEdit: {},
	tasksBoard: [],
	tab: "tasks",
	adminTab: "list",
	isLoading: false,
};

export const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		startLoadingTasks: (state) => {
			state.isLoading = true;
		},
		editTaskStatus: (state) => {
			state.edit = !state.edit;
		},
		setTasksBoard: (state, action) => {
			state.isLoading = false;
			state.tasksBoard = action.payload.tasksBoard;
		},
		setTab: (state, action) => {
			state.adminTab = action.payload;
		},
		saveTask: (state, { payload }) => {
			state.taskToEdit = payload;
		},
		setChanges: (state, action) => {
			state.tab = action.payload ? action.payload : state.tab;
			state.changes = !state.changes;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	startLoadingTasks,
	editTaskStatus,
	setTasksBoard,
	setTab,
	setChanges,
	saveTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
