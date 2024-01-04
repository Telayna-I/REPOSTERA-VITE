import React from "react";
import { useForm } from "react-hook-form";
import {
	UserCircleIcon,
	ShoppingBagIcon,
	ScaleIcon,
	DevicePhoneMobileIcon,
	BanknotesIcon,
	ClockIcon,
	CheckCircleIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Textarea } from "@material-tailwind/react";
import { useOrder } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { saveOrder, setEdit } from "../../store/slices/BoardSlice/BoardSlice";
import { useNavigate } from "react-router-dom";

const NewOrderForm = ({ order }) => {
	const {
		register,
		watch,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const { edit } = useSelector((state) => state.board);

	const { startCreatingOrder, editOrder } = useOrder();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const createOrder = async (data) => {
		if (edit) {
			editOrder(order._id, data);
		} else {
			startCreatingOrder(data);
		}
		navigate("/board", { replace: true });
	};
	return (
		<div className='main'>
			<form
				className='form-login mx-auto mt-8 mb-8 flex flex-col justify-center items-center xs:w-11/12 bg-white-form shadow rounded p-8 relative'
				onSubmit={handleSubmit(createOrder)}>
				{edit ? (
					<XCircleIcon
						className='absolute right-1 top-1 h-6 cursor-pointer text-red-500'
						onClick={() => {
							dispatch(setEdit());
							dispatch(saveOrder({}));
							navigate("/board");
						}}
					/>
				) : null}
				<div className='flex w-11/12 p-1.5 hover:border-gray-600 mb-2 border border-gray-400 rounded items-center'>
					<UserCircleIcon className='atIcon' />
					<input
						className='w-full pl-1.5 outline-none text-sm bg-transparent'
						type='text'
						autoComplete='off'
						defaultValue={order ? order.name : null}
						placeholder='Nombre y apellido'
						name='name'
						{...register("name", {
							required: {
								value: true,
								message: "El campo nombre es requerido",
							},
							minLength: {
								value: 4,
								message: "Introduce un nombre valido",
							},
						})}
					/>
					{!errors.name && watch("name") ? (
						<CheckCircleIcon className='h-4 text-green-600' />
					) : null}
				</div>
				{errors.name ? (
					<span className='text-xs self-start ml-4 mb-1 text-gray-500 flex justify-center items-center'>
						{errors.name.message}
						{<XCircleIcon className='h-4 ml-1 text-red-400' />}
					</span>
				) : null}
				<div className='flex w-11/12 p-1.5 hover:border-gray-600 mb-2 border border-gray-400 rounded items-center'>
					<ShoppingBagIcon className='keyIcon' />
					<input
						className='w-full pl-1.5 outline-none text-sm bg-transparent'
						type='text'
						autoComplete='off'
						placeholder='Producto'
						defaultValue={order ? order.product : null}
						name='product'
						{...register("product", {
							required: {
								value: true,
								message: "El campo producto es requerido",
							},
							minLength: {
								value: 4,
								message: "Introduce un producto valido",
							},
						})}
					/>
					{!errors.product && watch("product") ? (
						<CheckCircleIcon className='h-4 text-green-600' />
					) : null}
				</div>
				{errors.product ? (
					<span className='text-xs self-start ml-4 mb-1 text-gray-500 flex justify-center items-center'>
						{errors.product.message}
						{<XCircleIcon className='h-4 ml-1 text-red-400' />}
					</span>
				) : null}
				<div className='flex w-11/12 p-1.5 hover:border-gray-600 mb-2 border border-gray-400 rounded items-center'>
					<ScaleIcon className='keyIcon' />
					<input
						className='w-full pl-1.5 outline-none text-sm bg-transparent'
						type='text'
						autoComplete='off'
						placeholder='Kilos'
						defaultValue={order ? order.kilos : null}
						name='kilos'
						{...register("kilos", {
							required: {
								value: true,
								message: "El campo kilos es requerido.",
							},
							minLength: {
								value: 1,
								message: "El producto debe tener peso.",
							},
							pattern: {
								value: /^[0-9]*(\.?)[ 0-9]+$/,
								message:
									"El peso debe ser expresado en numeros",
							},
						})}
					/>
					{!errors.kilos && watch("kilos") ? (
						<CheckCircleIcon className='h-4 text-green-600' />
					) : null}
				</div>
				{errors.kilos ? (
					<span className='text-xs self-start ml-4 mb-1 text-gray-500 flex justify-center items-center'>
						{errors.kilos.message}
						{<XCircleIcon className='h-4 ml-1 text-red-400' />}
					</span>
				) : null}
				<div className='flex w-11/12 p-1.5 hover:border-gray-600 mb-2 border border-gray-400 rounded items-center'>
					<DevicePhoneMobileIcon className='keyIcon' />
					<input
						className='w-full pl-1.5 outline-none text-sm bg-transparent'
						type='text'
						autoComplete='off'
						placeholder='Telefono'
						defaultValue={order ? order.phone : null}
						name='phone'
						{...register("phone", {
							required: {
								value: true,
								message: "El campo telefono es requerido.",
							},
							minLength: {
								value: 10,
								message:
									"El telefono debe tener al menos 10 caracteres",
							},
							pattern: {
								value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
								message:
									"El formato de telefono no es correcto",
							},
						})}
					/>
					{!errors.phone && watch("phone") ? (
						<CheckCircleIcon className='h-4 text-green-600' />
					) : null}
				</div>
				{errors.phone ? (
					<span className='text-xs self-start ml-4 mb-1 text-gray-500 flex justify-center items-center'>
						{errors.phone.message}
						{<XCircleIcon className='h-4 ml-1 text-red-400' />}
					</span>
				) : null}
				<div className='flex w-11/12 p-1.5 hover:border-gray-600 mb-2 border border-gray-400 rounded items-center'>
					<BanknotesIcon className='keyIcon' />
					<input
						className='w-full pl-1.5 outline-none text-sm bg-transparent'
						type='text'
						autoComplete='off'
						placeholder='Seña'
						defaultValue={order ? order.advance : null}
						name='advance'
						{...register("advance", {
							required: {
								value: true,
								message: "La seña es requerida.",
							},
							pattern: {
								value: /^[0-9]*(\.?)[ 0-9]+$/,
								message:
									"La seña debe ser expresada solo en numeros.",
							},
						})}
					/>
					{!errors.advance && watch("advance") ? (
						<CheckCircleIcon className='h-4 text-green-600' />
					) : null}
				</div>
				{errors.advance ? (
					<span className='text-xs self-start ml-4 mb-1 text-gray-500 flex justify-center items-center'>
						{errors.advance.message}
						{<XCircleIcon className='h-4 ml-1 text-red-400' />}
					</span>
				) : null}
				<div className='flex w-11/12 p-1.5 hover:border-gray-600 mb-2 border border-gray-400 rounded items-center'>
					<CalendarDaysIcon className='keyIcon' />
					<input
						className='w-full pl-1.5 outline-none text-sm bg-transparent'
						type='date'
						autoComplete='off'
						placeholder='Fecha'
						defaultValue={order ? order.date : null}
						name='date'
						{...register("date", {
							required: {
								value: true,
								message: "El campo fecha es requerido",
							},
							minLength: {
								value: 10,
								message: "Ingresa una fecha valida",
							},
						})}
					/>
					{!errors.date && watch("date") ? (
						<CheckCircleIcon className='h-4 text-green-600' />
					) : null}
				</div>
				{errors.date ? (
					<span className='text-xs self-start ml-4 mb-1 text-gray-500 flex justify-center items-center'>
						{errors.date.message}
						{<XCircleIcon className='h-4 ml-1 text-red-400' />}
					</span>
				) : null}
				<div className='flex w-11/12 p-1.5 hover:border-gray-600 mb-2 border border-gray-400 rounded items-center'>
					<ClockIcon className='keyIcon' />
					<input
						className='w-full pl-1.5 outline-none text-sm bg-transparent'
						type='text'
						autoComplete='off'
						placeholder='Hora'
						defaultValue={order ? order.hour : null}
						name='hour'
						{...register("hour", {
							required: {
								value: true,
								message: "El campo hora es requerido",
							},
							pattern: {
								value: /^[0-9]*(\.?)[ 0-9]+$/,
								message:
									"La hora debe ser expresada solo en numeros",
							},
						})}
					/>
					{!errors.hour && watch("hour") ? (
						<CheckCircleIcon className='h-4 text-green-600' />
					) : null}
				</div>
				{errors.hour ? (
					<span className='text-xs self-start ml-4 mb-1 text-gray-500 flex justify-center items-center'>
						{errors.hour.message}
						{<XCircleIcon className='h-4 ml-1 text-red-400' />}
					</span>
				) : null}
				<div className='textarea'>
					<Textarea
						variant='outlined'
						className='mb-0'
						label='Notas'
						autoComplete='off'
						defaultValue={order ? order.notes : null}
						name='notes'
						rows={"6"}
						{...register("notes", {
							required: {
								value: true,
								message: "El campo notas es requerido",
							},
							minLength: {
								value: 10,
								message: "Ingresa una nota valida",
							},
						})}
					/>
					{!errors.notes && watch("notes") ? (
						<CheckCircleIcon className='h-4 ml-2 text-green-600' />
					) : null}
				</div>
				{errors.notes ? (
					<span className='text-xs self-start ml-4 mb-4 text-gray-500 flex justify-center items-center'>
						{errors.notes.message}
						{<XCircleIcon className='h-4 ml-1 text-red-400' />}
					</span>
				) : null}
				<button
					type='submit'
					value='submit'
					className='button-submit w-11/12 p-1.5 bg-color-button text-white-form cursor-pointer rounded font-semibold'>
					{!order?.name === "undefined"
						? "Crear pedido"
						: "Editar pedido"}
				</button>
			</form>
		</div>
	);
};

export default NewOrderForm;
