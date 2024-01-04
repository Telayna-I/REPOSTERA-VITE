import reposteraApi from "../../../api/reposteraApi";
import { setBoard, startLoadingBoard } from "./BoardSlice";

export const getBoard = (value = "orders") => {
	return async (dispatch) => {
		dispatch(startLoadingBoard());
		try {
			const { data } = await reposteraApi.get(`/orders`);
			const { orders } = data;

			const todo = orders.filter(
				(order) => order.finished === false && order.status === true
			);
			const finished = orders.filter(
				(order) => order.finished === true && order.status === true
			);
			const deleted = orders.filter((order) => order.status === false);

			switch (value) {
				case "orders":
					dispatch(
						setBoard({
							board: todo,
						})
					);
					break;
				case "finished":
					dispatch(
						setBoard({
							board: finished,
						})
					);
					break;
				case "deleted":
					dispatch(
						setBoard({
							board: deleted,
						})
					);
					break;

				default:
					console.warn("No contemple esta opcion");
					break;
			}
		} catch (error) {
			console.log(error);
		}
	};
};
