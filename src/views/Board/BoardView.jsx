import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoard } from "../../store/slices/BoardSlice/thunks";
import { TabsWithIcon } from "../../components/TabsWithIcon/TabsWithIcon";
import { Title } from "../../components/Title/Title";
import Order from "../../components/Order/Order";
import { Toaster } from "react-hot-toast";

const BoardView = () => {
	const dispatch = useDispatch();

	const { board, changes, tab } = useSelector((state) => state.board);

	useEffect(() => {
		dispatch(getBoard(tab));
	}, [changes]);

	return (
		<div className='Board flex flex-col justify-center'>
			<Toaster position='top-right' reverseOrder={false} />
			<Title title={"Tablero"} />
			<TabsWithIcon />
			<hr className='' />

			{board.map((order) => (
				<Order order={order} key={order._id} />
			))}
		</div>
	);
};

export default BoardView;
