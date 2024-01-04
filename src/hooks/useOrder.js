import { useDispatch } from "react-redux";
import reposteraApi from "../api/reposteraApi";
import { useNavigate } from "react-router-dom";
import {
	setChanges,
	setEdit,
	startLoadingBoard,
	tracking,
} from "../store/slices/BoardSlice/BoardSlice";
import toast from "react-hot-toast";

export const useOrder = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const startCreatingOrder = async (order) => {
		try {
			const { data } = await reposteraApi.post("/orders", {
				name: order.name,
				product: order.product,
				kilos: order.kilos,
				phone: order.phone,
				advance: order.advance,
				date: order.date,
				hour: order.hour,
				notes: order.notes,
				status: order.status,
				finished: order.finished,
			});
			toast.success("Nuevo pedido creado 🚀");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const deleteOrder = async (id) => {
		try {
			const { data } = await reposteraApi.put(`/orders/delete/${id}`);
			dispatch(setChanges());
			toast.success("Pedido eliminado correctamente 🚀");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const editOrder = async (id, order) => {
		dispatch(startLoadingBoard());
		try {
			const { data } = await reposteraApi.put(`/orders/${id}`, {
				name: order.name,
				product: order.product,
				kilos: order.kilos,
				phone: order.phone,
				advance: order.advance,
				date: order.date,
				hour: order.hour,
				notes: order.notes,
				status: order.status,
				finished: order.finished,
			});
			dispatch(setEdit());
			toast.success("Pedido editado correctamente 🚀");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const finishedOrder = async (id) => {
		try {
			const { data } = await reposteraApi.put(`/orders/finished/${id}`);
			dispatch(setChanges());
			toast.success("Pedido finalizado 🚀");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const getOrderById = async (id) => {
		try {
			const { data } = await reposteraApi.get(`orders/order/${id}`);
			const { order } = data;
			dispatch(tracking(order));
		} catch (error) {
			console.log(error);
		}
	};

	return {
		//* Metodos
		startCreatingOrder,
		deleteOrder,
		finishedOrder,
		editOrder,
		getOrderById,
	};
};
