import { useDispatch, useSelector } from "react-redux";
import reposteraApi from "../api/reposteraApi";
import { checkingCredential, logIn, logOut } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuthStore = () => {
	const { status, user, errorMessage } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const startLogin = async ({ email, password }) => {
		dispatch(checkingCredential());
		try {
			const { data } = await reposteraApi.post("/auth/login", {
				email,
				password,
			});
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));
			dispatch(
				logIn({
					name: data.user.name,
					role: data.user.role,
					uid: data.user.uid,
				})
			);
			console.log({ data });
			navigate("/", { replace: true });
		} catch (error) {
			dispatch(logOut("Credenciales incorrectas."));
		}
	};

	const startLogout = async () => {
		dispatch(checkingCredential());
		try {
			dispatch(logOut());
			localStorage.clear();
		} catch (error) {
			console.log(error);
		}
	};
	return {
		//* Propiedades

		status,
		user,
		errorMessage,

		//* Metodos
		startLogin,
		startLogout,
	};
};
