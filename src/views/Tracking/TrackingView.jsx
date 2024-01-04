import React, { useEffect } from "react";
import { CustomSpinner } from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Title } from "../../components/Title/Title";
import { useOrder } from "../../hooks/useOrder";
import {
	ChatBubbleLeftIcon,
	CheckCircleIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const TrackingView = () => {
	const { tracked } = useSelector((state) => state.board);

	const { getOrderById } = useOrder();

	const {
		register,
		watch,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const refresh = () => {
		window.location.reload(false);
	};

	const rastrearPedido = (data) => {
		const { id } = data;
		getOrderById(id);
	};

	if (!tracked.name) {
		return (
			<div className='flex h-full'>
				<div className='mx-auto xs:w-3/4   '>
					<Title title={"Ver estado de tu pedido"} />
					<form
						className=' xs:w-3/4 mx-auto p-5 bg-blue-gray-50 rounded-sm shadow-md'
						onSubmit={handleSubmit(rastrearPedido)}>
						<input
							className='w-full border border-gray-300  outline-none p-1 pl-2 mb-2 text-sm '
							type='text'
							autoComplete='off'
							placeholder='Introduce el codigo de pedido'
							name='id'
							{...register("id", {
								required: {
									value: true,
									message: "Por favor introduzca un codigo",
								},
								minLength: {
									value: 24,
									message:
										"El codigo debe tener 24 caracteres",
								},
								maxLength: {
									value: 24,
									message:
										"El codigo posee mas de 24 caracteres",
								},
							})}
						/>
						{errors.name ? (
							<span className='text-xs self-start ml-4 mb-1 text-gray-500 flex justify-center items-center'>
								{errors.name.message}
								{
									<XCircleIcon className='h-4 ml-1 text-red-400' />
								}
							</span>
						) : null}
						<button
							type='submit'
							value='submit'
							className=' py-1 text-white cursor-pointer rounded-sm font-semibold w-full bg-color-button'>
							{" "}
							Rastrear pedido
						</button>
					</form>
				</div>
			</div>
		);
	} else {
		return (
			<div className=' h-full flex flex-col justify-center items-center'>
				<div className='flex flex-col bg-white rounded-sm m-auto mt-16 xs:w-11/12 p-10 pb-8 justify-center items-left'>
					<h2 className='text-2xl font-bold'>{tracked.name}</h2>
					<div className='pl-1 mt-3'>
						{tracked.finished ? (
							<p>
								Su pedido esta listo, consulte si ya esta en
								nuestra sucursal.
							</p>
						) : (
							<p>Estamos trabajando en su pedido.</p>
						)}
					</div>
					<div className='flex justify-between xs:justify-around mt-7'>
						{tracked ? (
							<Link
								to={`https://api.whatsapp.com/send?phone=54${tracked.phone}&text=Este%20es%20su%20codigo%20de%20seguimiento%3A%20${tracked._id}`}
								className='p-2 xs:m-2 bg-verde-wsp rounded-sm font-bold text-white-form flex justify-center items-center'
								rel='noopener noreferrer'
								target={"_blank"}>
								<ChatBubbleLeftIcon
									className='h-5 mr-2'
									strokeWidth='2.5'
								/>{" "}
								Whatsapp
							</Link>
						) : null}
						<button
							className='p-2 xs:m-2 bg-blue-gray-500 rounded-sm font-bold text-white-form'
							onClick={refresh}>
							Volver a rastrear pedido
						</button>
					</div>
				</div>
			</div>
		);
	}
};

export default TrackingView;
