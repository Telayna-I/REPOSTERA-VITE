import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
	AtSymbolIcon,
	CheckCircleIcon,
	CheckIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/solid";
import { BsCake } from "react-icons/bs";

import { checkingAuthentication } from "../../store/auth/thunks";
import { useAuthStore } from "../../hooks/useAuthStore";
import "./LogInView.css";
import { CustomSpinner } from "../../components/Spinner/Spinner";

const LogInView = () => {
	const {
		register,
		watch,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const dispatch = useDispatch();
	const { startLogin } = useAuthStore();
	const { status } = useSelector((state) => state.auth);

	const onLogIn = async (data) => {
		dispatch(checkingAuthentication());
		const { email, password } = data;
		startLogin({ email, password });
	};

	if (status === "checking") {
		return <CustomSpinner />;
	}

	return (
		<div className='main'>
			<form
				className='form-login mx-auto mt-8 mb-8 flex flex-col justify-center items-center  bg-white-form shadow rounded p-8 xs:w-4/5  lg:w-2/5'
				onSubmit={handleSubmit(onLogIn)}>
				<h2 className='h2-login flex justify-center items-center mb-8 text-2xl font-semibold xs:text-xl'>
					La Repostera App <BsCake className='text-2xl ml-2' />{" "}
				</h2>
				<div className='flex w-11/12 p-1.5 hover:border-gray-600 mb-2 border border-gray-400 rounded items-center'>
					<AtSymbolIcon className='atIcon' />
					<input
						className='w-full pl-1.5 outline-none text-sm bg-transparent'
						type='text'
						autoComplete='on'
						placeholder='Email'
						name='email'
						{...register("email", {
							required: {
								value: true,
								message: "El campo email es requerido",
							},
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: "El formato de email no es correcto",
							},
						})}
					/>
					{!errors.email && watch("email") ? (
						<CheckCircleIcon className='h-4 text-green-600' />
					) : null}
				</div>
				{errors.email ? (
					<span className='text-xs self-start ml-4 mb-1 text-gray-500 flex justify-center items-center'>
						{errors.email.message}
						{<XCircleIcon className='h-4 ml-1 text-red-400' />}
					</span>
				) : null}
				<div className='flex w-11/12 p-1.5 mb-2 border border-gray-400 hover:border-gray-600 rounded items-center '>
					<KeyIcon className='keyIcon' />
					<input
						className='w-full  pl-1.5 outline-none text-sm bg-transparent'
						type='password'
						autoComplete='off'
						placeholder='Contraseña'
						name='password'
						{...register("password", {
							required: {
								value: true,
								message: "El campo password es requerido",
							},
							minLength: {
								value: 6,
								message:
									"La contraseña debe tener al menos 6 caracteres",
							},
						})}
					/>
					{!errors.password && watch("password") ? (
						<CheckCircleIcon className='h-4 text-green-600' />
					) : null}
				</div>
				{errors.password ? (
					<span className='text-xs self-start ml-4 mb-1 text-gray-500 flex justify-center items-center'>
						{errors.password.message}
						{<XCircleIcon className='h-4 ml-1 text-red-400' />}
					</span>
				) : null}
				<button
					type='submit'
					value='submit'
					className='button-submit w-11/12 p-1.5 bg-color-button text-white-form cursor-pointer rounded font-semibold'>
					{" "}
					Iniciar Sesión
				</button>
			</form>
		</div>
	);
};

export default LogInView;
