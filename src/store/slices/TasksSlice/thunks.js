import reposteraApi from "../../../api/reposteraApi";
import { setTasksBoard, startLoadingTasks } from "./TasksSlice";

export const getTasksBoard = (value = "tasks") => {
	return async (dispatch) => {
		dispatch(startLoadingTasks());
		try {
			const { data } = await reposteraApi.get(`/tasks`);
			const { tasks } = data;

			const todo = tasks.filter(
				(task) => task.finished === false && task.status === true
			);
			const finished = tasks.filter(
				(task) => task.finished === true && task.status === true
			);
			const deleted = tasks.filter((task) => task.status === false);

			switch (value) {
				case "tasks":
					dispatch(
						setTasksBoard({
							tasksBoard: todo,
						})
					);
					break;
				case "finished":
					dispatch(
						setTasksBoard({
							tasksBoard: finished,
						})
					);
					break;
				case "deleted":
					dispatch(
						setTasksBoard({
							tasksBoard: deleted,
						})
					);
					break;

				default:
					console.warn("No contemple esta opcion");
					break;
			}
		} catch (error) {
			console.log(error);
		}
	};
};
