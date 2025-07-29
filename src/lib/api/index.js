import axios from 'axios';
import { PUBLIC_API_URL } from '$env/static/public';
import { authStore, refreshToken } from '$lib/stores/auth';
import { browser } from '$app/environment';

export const publicApi = axios.create({
	baseURL: PUBLIC_API_URL || 'http://localhost:8080/v1',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
});

// Instancia para peticiones autenticadas
export const authApi = axios.create({
	baseURL: PUBLIC_API_URL || 'http://localhost:8080/v1',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
});

// Interceptor para manejar errores 401 y refrescar el token
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed() {
	refreshSubscribers.forEach((callback) => callback());
	refreshSubscribers = [];
}

function subscribeToRefresh(callback) {
	refreshSubscribers.push(callback);
}

authApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (isRefreshing) {
				// Esperar a que termine el refresco
				return new Promise((resolve) => {
					subscribeToRefresh(() => {
						resolve(authApi(originalRequest));
					});
				});
			}

			isRefreshing = true;

			try {
				await refreshToken();
				isRefreshing = false;
				onRefreshed();
				return authApi(originalRequest);
			} catch (refreshError) {
				isRefreshing = false;
				authStore.set(null);
				if (browser) {
					localStorage.removeItem('isAuthenticated');
					localStorage.removeItem('user');
					window.location.href = '/auth/login';
				}
				return Promise.reject(refreshError);
			}
		}

		// Manejar otros errores (como 500)
		if (error.response?.status === 500) {
			console.error('Error 500 del servidor:', error.response?.data);
		}

		return Promise.reject(error);
	}
);
