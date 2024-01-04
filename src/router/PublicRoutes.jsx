import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LogInView, TrackingView } from "../views";

export const PublicRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='login' element={<LogInView />} />

				<Route path='tracking' element={<TrackingView />} />

				<Route path='/' element={<Navigate to='/login' />} />

				<Route path='/*' element={<LogInView />} />
			</Routes>
		</>
	);
};
