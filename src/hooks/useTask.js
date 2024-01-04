import { useDispatch } from "react-redux";
import reposteraApi from "../api/reposteraApi";
import { useNavigate } from "react-router-dom";
import {
	editTaskStatus,
	setChanges,
	setTab,
} from "../store/slices/TasksSlice/TasksSlice";
import toast from "react-hot-toast";

export const useTask = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const startCreatingTask = async (title, description) => {
		try {
			const { data } = await reposteraApi.post("/tasks", {
				title,
				description,
			});
			dispatch(setTab("list"));
			toast.success("Tarea creada correctamente 🚀");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const deleteTask = async (id) => {
		try {
			const { data } = await reposteraApi.put(`/tasks/delete/${id}`);
			dispatch(setChanges());
			toast.success("Tarea eliminada correctamente 🚀");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const editTask = async (task, id) => {
		try {
			const { data } = await reposteraApi.put(`/tasks/${id}`, {
				title: task.title,
				description: task.description,
			});
			dispatch(editTaskStatus());
			toast.success("Tarea editada correctamente 🚀");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const finishedTask = async (id) => {
		try {
			const { data } = await reposteraApi.put(`/tasks/finished/${id}`);
			dispatch(setChanges());
			toast.success("Tarea finalizada correctamente 🚀");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	return {
		//* Metodos
		startCreatingTask,
		deleteTask,
		editTask,
		finishedTask,
	};
};
