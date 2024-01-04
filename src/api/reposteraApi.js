import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_REPOSTERA_API_URL } = getEnvVariables();

const reposteraApi = axios.create({
	baseURL: VITE_REPOSTERA_API_URL,
});

// Configuracion de interceptores.

reposteraApi.interceptors.request.use((config) => {
	config.headers = {
		...config.headers,
		"x-token": localStorage.getItem("token"),
	};

	return config;
});

export default reposteraApi;
