import React from "react";
import { Title } from "../../components/Title/Title";
import NewOrderForm from "../../components/NewOrderForm/NewOrderForm";
import toast, { Toaster } from "react-hot-toast";

const CreateOrderView = ({ order = {} }) => {
	return (
		<div>
			<Toaster position='top-right' reverseOrder={false} />
			<Title title={"Nuevo Pedido"} />
			<NewOrderForm order={order} />
		</div>
	);
};

export default CreateOrderView;
