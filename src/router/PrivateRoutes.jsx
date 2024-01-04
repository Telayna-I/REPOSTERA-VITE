import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BoardView, CreateOrderView, PricesView, TasksView } from "../views";
import EditOrderView from "../views/EditOrder/EditOrderView";
import EditTaskView from "../views/EditTask/EditTaskView";

export const PrivateRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='board' element={<BoardView />} />

				<Route path='createOrder' element={<CreateOrderView />} />

				<Route path='prices' element={<PricesView />} />

				<Route path='tasks' element={<TasksView />} />

				<Route path='edit' element={<EditOrderView />} />

				<Route path='editTask' element={<EditTaskView />} />

				<Route path='/' element={<Navigate to='/board' />} />

				<Route path='/*' element={<Navigate to='/board' />} />
			</Routes>
		</>
	);
};
