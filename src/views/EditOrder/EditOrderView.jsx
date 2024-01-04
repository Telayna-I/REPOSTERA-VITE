import React from "react";
import NewOrderForm from "../../components/NewOrderForm/NewOrderForm";
import { Title } from "../../components/Title/Title";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const EditView = () => {
	const { orderToEdit, edit } = useSelector((state) => state.board);
	if (!edit) {
		return <Navigate to={"/board"} />;
	}
	return (
		<div className=''>
			<Toaster position='top-right' reverseOrder={false} />
			<Title title={"Editar Pedido"} />
			<NewOrderForm order={orderToEdit} />
		</div>
	);
};

export default EditView;
