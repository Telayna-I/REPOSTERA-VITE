import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LogInView, TrackingView } from "../views";

export const PublicRoutes = () => {
	return (
		<>
			<Routes>
				<Route index path='/' element={<LogInView />} />

				<Route path='tracking' element={<TrackingView />} />

				<Route path='/*' element={<LogInView />} />
			</Routes>
		</>
	);
};
