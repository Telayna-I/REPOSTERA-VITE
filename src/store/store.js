import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./slices/BoardSlice/BoardSlice";
import { authSlice } from "./auth";
import { tasksSlice } from "./slices/TasksSlice/TasksSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		board: boardSlice.reducer,
		tasks: tasksSlice.reducer,
	},
});
