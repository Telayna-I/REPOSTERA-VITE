import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";
import { useTask } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import {
	editTaskStatus,
	saveTask,
} from "../../store/slices/TasksSlice/TasksSlice";

import { useNavigate } from "react-router-dom";
import {
	ArrowUturnLeftIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";

const Task = ({ task }) => {
	const { finishedTask, deleteTask } = useTask();
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className='  bg-white-form rounded-sm shadow-sm flex flex-col p-4 relative mx-auto mb-2  xl:w-2/4 xs:w-3/4'>
			{task.finished && user.role === "VENTAS_ROLE" ? (
				<FaRegCircleCheck
					onClick={() => {
						finishedTask(task._id);
					}}
					className='absolute right-3 cursor-pointer text-green-600'
				/>
			) : null}
			{!task.finished && user.role === "VENTAS_ROLE" ? (
				<FaRegCircle
					onClick={() => {
						finishedTask(task._id);
					}}
					className='absolute right-3 cursor-pointer  text-yellow-700'
				/>
			) : null}
			<h6 className='text-2xl font-bold sm:w-full'>{task.title}</h6>
			<p className='text-sm xl:pl-1 mt-2 sm:w-full '>
				{task.description}
			</p>
			<div className='buttons flex justify-between mt-3'>
				{user.role === "ADMIN_ROLE" && task.status ? (
					<button
						onClick={() => {
							deleteTask(task._id);
						}}
						className='button flex border bg-pink-600 border-pink-50 text-sm p-1 rounded-md justify-center items-center text-white font-semibold'>
						<TrashIcon
							strokeWidth={2}
							className='size-4 text-white  mr-2'
						/>
						Eliminar
					</button>
				) : null}
				{user.role === "ADMIN_ROLE" && !task.status ? (
					<button
						onClick={() => {
							deleteTask(task._id);
						}}
						className='button flex border bg-pink-600 border-pink-50 p-1 text-sm rounded-md justify-center items-center text-white font-semibold mx-auto'>
						<ArrowUturnLeftIcon
							strokeWidth={2}
							className='size-4 text-white  mr-2'
						/>
						Recuperar
					</button>
				) : null}
				{user.role === "ADMIN_ROLE" && !task.finished ? (
					<button
						onClick={() => {
							dispatch(editTaskStatus());
							dispatch(saveTask(task));
							navigate("/editTask");
						}}
						className='button flex border p-1 rounded-md justify-center items-center text-sm text-white font-semibold bg-blue-600'>
						<PencilSquareIcon
							strokeWidth={2}
							className='h-4 text-zinc-800 mr-2'
						/>
						Editar
					</button>
				) : null}
			</div>
		</div>
	);
};

export default Task;
