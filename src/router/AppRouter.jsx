import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { useSelector } from "react-redux";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
	const { status } = useSelector((state) => state.auth);

	return (
		<>
			<Routes>
				{status === "authenticated" ? (
					<Route element={<PrivateRoutes />} path='/*' />
				) : (
					<Route element={<PublicRoutes />} path='/*' />
				)}
				<Route element={<Navigate to={"/"} />} path='/*' />
			</Routes>
		</>
	);
};
