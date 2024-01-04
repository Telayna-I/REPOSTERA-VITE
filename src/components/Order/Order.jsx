import React, { useState } from "react";
import { useOrder } from "../../hooks";
import NewOrderForm from "../NewOrderForm/NewOrderForm";

import {
	CheckCircleIcon,
	PencilSquareIcon,
	TrashIcon,
	ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { saveOrder, setEdit } from "../../store/slices/BoardSlice/BoardSlice";
import { Link, useNavigate } from "react-router-dom";

const Order = ({ order }) => {
	const { deleteOrder, finishedOrder } = useOrder();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div
			className=' sm:w-3/4 xl:w-6/12 bg-white card mx-auto  mt-5 rounded-lg overflow-hidden'
			key={order._id}>
			<div
				className={`flex justify-between py-2 text-white px-2 drop-shadow-md ${
					order.finished ? "bg-green-500" : "bg-blue-gray-900"
				} `}>
				<h2 className='card-title'>
					<span className='font-bold'>Apellido:</span>{" "}
					{order.client || order.name}
				</h2>
				<p className='card-date'>
					<span className='font-bold'>Fecha de entrega:</span>{" "}
					<span className='bg-yellow-700'>{order.date}</span>
				</p>
			</div>
			<div className='detalle p-4'>
				<p className='mb-2'>
					<span className='font-bold'>Producto encargado:</span>{" "}
					{order.product}
				</p>
				{order.kilos !== "" && (
					<p className='mb-2'>
						<span className='font-bold'>Kilos:</span> {order.kilos}
						Kg.
					</p>
				)}
				{order.advance !== "" && (
					<p className='mb-2'>
						<span className='font-bold'>Seña:</span> ${" "}
						{order.advance}
					</p>
				)}
				<p className='mb-2'>
					<span className='font-bold'>Hora:</span> {order.hour}
				</p>
				<p className='mb-2'>
					<Link
						className='font-bold'
						to={`https://api.whatsapp.com/send?phone=+54${order.phone}&text=Este%20es%20tu%20codigo%20de%20seguimiento%20%3A%20${order._id}`}
						target='_blank'
						rel='noopener noreferrer'>
						Telefono:
					</Link>{" "}
					{order.phone}
				</p>
				<p className='mb-2'>
					<span className='font-bold'>Vendedor:</span>{" "}
					{order.user.name}
				</p>
				<div className='mb-2 p-2 ml-3 bg-gray-200 rounded-sm border border-blue-gray-100 shadow-lg'>
					<p className='notas'>
						<span className='font-bold'>Notas:</span> {order.notes}
					</p>
				</div>
			</div>
			<div className='p-4 flex justify-between w-3/4 mx-auto xs:w-11/12 xs:pl-0 xs:pr-0'>
				{order.status ? (
					<button
						onClick={() => {
							deleteOrder(order._id);
						}}
						className='button flex border bg-pink-600 border-pink-50 p-2 rounded-md justify-center text-white font-semibold'>
						<TrashIcon
							strokeWidth={2}
							className='size-5 text-white  mr-2'
						/>
						Eliminar
					</button>
				) : (
					<button
						onClick={() => {
							deleteOrder(order._id);
						}}
						className='button flex border bg-pink-600 border-pink-50 p-2 rounded-md justify-center text-white font-semibold mx-auto'>
						<ArrowUturnLeftIcon
							strokeWidth={2}
							className='size-5 text-white  mr-2'
						/>
						Recuperar
					</button>
				)}
				{order.status ? (
					<button
						onClick={() => {
							dispatch(setEdit());
							dispatch(saveOrder(order));
							navigate("/edit");
						}}
						className='button flex border p-2 rounded-md justify-center items-center text-white font-semibold bg-blue-600'>
						<PencilSquareIcon
							strokeWidth={2}
							className='h-5 text-zinc-800 mr-2'
						/>
						Editar
					</button>
				) : null}
				{order.status ? (
					<button
						onClick={() => {
							finishedOrder(order._id);
						}}
						className='button flex border p-2 rounded-md justify-center items-center text-white bg-green-500 font-bold'>
						<CheckCircleIcon
							strokeWidth={2}
							className='h-6 text-zinc-800 mr-2'
						/>
						Listo
					</button>
				) : null}
			</div>
		</div>
	);
};

export default Order;
