import React from "react";
import { useDispatch } from "react-redux";
import { setTab } from "../../store/slices/TasksSlice/TasksSlice";

export const ButtonGroup = ({ adminTab }) => {
	const dispatch = useDispatch();
	return (
		<div className='mx-auto mb-5'>
			<span className='inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm'>
				<button
					onClick={() => {
						dispatch(setTab("new"));
					}}
					className={`inline-block px-4 ${
						adminTab === "new" ? "bg-gray-200" : null
					} py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:relative`}>
					Nueva tarea
				</button>

				<button
					onClick={() => {
						dispatch(setTab("list"));
					}}
					className={`inline-block px-4 ${
						adminTab === "list" ? "bg-gray-200" : null
					} py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:relative`}>
					Lista de tareas
				</button>
			</span>
		</div>
	);
};
