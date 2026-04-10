import axios from "axios";

export function getBackendUrl() {
	return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
}

export function getToken() {
	if (typeof window === "undefined") return "";
	return localStorage.getItem("scholarchain_token") || "";
}

export function setToken(token) {
	if (typeof window === "undefined") return;
	if (!token) localStorage.removeItem("scholarchain_token");
	else localStorage.setItem("scholarchain_token", token);
}

export const api = axios.create({
	baseURL: getBackendUrl(),
	headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

