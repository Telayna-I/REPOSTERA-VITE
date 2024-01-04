import React from "react";
import { Title } from "../Title/Title";
import { useForm } from "react-hook-form";
import { Textarea } from "@material-tailwind/react";
import { useTask } from "../../hooks";
import {
	editTaskStatus,
	saveTask,
} from "../../store/slices/TasksSlice/TasksSlice";
import { useDispatch } from "react-redux";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const NewTaskForm = ({ task, edit }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const { editTask, startCreatingTask } = useTask();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleTask = (data) => {
		if (edit) {
			editTask(data, task._id);
			navigate("/tasks");
		} else {
			const { title, description } = data;
			startCreatingTask(title, description);
		}
	};

	return (
		<div className='flex h-full w-full'>
			<div className='mx-auto w-full'>
				<form
					className='  lg:w-2/4 xs:w-3/4 mx-auto p-7 bg-blue-gray-50 rounded-sm shadow-md relative'
					onSubmit={handleSubmit(handleTask)}>
					{edit ? (
						<XCircleIcon
							className='absolute right-1 top-1 h-6 cursor-pointer text-red-500'
							onClick={() => {
								dispatch(editTaskStatus());
								dispatch(saveTask({}));
								navigate("/tasks");
							}}
						/>
					) : null}
					<input
						className='w-full border border-gray-300  outline-none p-1 pl-2 mb-2 text-sm '
						type='text'
						autoComplete='off'
						placeholder='Titulo'
						defaultValue={task ? task.title : null}
						name='title'
						{...register("title", {
							required: {
								value: true,
								message: "Por favor introduzca un titulo",
							},
							minLength: {
								value: 5,
								message: "El codigo debe tener 5 caracteres",
							},
							maxLength: {
								value: 30,
								message: "El codigo posee mas de 24 caracteres",
							},
						})}
					/>
					<Textarea
						variant='outlined'
						label='Descripcion'
						autoComplete='off'
						defaultValue={task ? task.description : null}
						name='description'
						rows={"4"}
						{...register("description", {
							required: {
								value: true,
								message: "El campo descripcion es requerido",
							},
							minLength: {
								value: 10,
								message: "Ingresa una descripcion valida",
							},
						})}
					/>
					<button
						type='submit'
						value='submit'
						className=' py-1 text-white cursor-pointer rounded-sm font-semibold w-full bg-color-button'>
						{!task?.name === "undefined"
							? "Crear tarea"
							: "Editar tarea"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default NewTaskForm;
