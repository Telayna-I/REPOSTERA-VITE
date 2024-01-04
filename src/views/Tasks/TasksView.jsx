import React, { useEffect } from "react";
import { Title } from "../../components/Title/Title";
import { ButtonGroup } from "../../components/ButtonGroup/ButtonGroup";
import Task from "../../components/Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { getTasksBoard } from "../../store/slices/TasksSlice/thunks";
import { TabsWithIconTasks } from "../../components/TabsWithIconTasks/TabsWithIconTasks";
import NewTaskForm from "../../components/NewTaskForm/NewTaskForm";
import { setTab } from "../../store/slices/TasksSlice/TasksSlice";
import { Toaster } from "react-hot-toast";

const CreateTaskView = () => {
	const { user } = useSelector((state) => state.auth);
	const { tasksBoard, changes, tab, adminTab, edit } = useSelector(
		(state) => state.tasks
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTab("list"));
		dispatch(getTasksBoard(tab));
	}, [tab, changes]);

	if (adminTab === "new") {
		return (
			<div className='flex flex-col justify-center items-center'>
				<Toaster position='top-right' reverseOrder={false} />
				<Title title={"Crear tarea"} className='' />
				{user.role === "ADMIN_ROLE" ? (
					<ButtonGroup adminTab={adminTab} />
				) : null}
				<NewTaskForm className='w-full' />;
			</div>
		);
	}

	return (
		<div className='flex flex-col justify-center items-center'>
			<Toaster position='top-right' reverseOrder={false} />
			<Title className='' title={"Tareas"} />
			{user.role === "ADMIN_ROLE" ? (
				<ButtonGroup adminTab={adminTab} />
			) : null}
			<TabsWithIconTasks all={"tasks"} name={"Tareas"} />
			{tasksBoard.map((task) => (
				<Task task={task} key={task._id} />
			))}
		</div>
	);
};

export default CreateTaskView;
