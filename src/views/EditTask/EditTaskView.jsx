import React from "react";
import { Title } from "../../components/Title/Title";
import NewTaskForm from "../../components/NewTaskForm/NewTaskForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const EditTaskView = () => {
	const { taskToEdit, edit } = useSelector((state) => state.tasks);
	if (!edit) {
		return <Navigate to={"/tasks"} />;
	}
	return (
		<div>
			<Toaster position='top-right' reverseOrder={false} />
			<Title title={"Editar Tarea"} />
			<NewTaskForm task={taskToEdit} edit={edit} />
		</div>
	);
};

export default EditTaskView;
