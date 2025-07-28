import api from './index';

export async function login(email, password, remember = false) {
	try {
		const response = await api.post('/auth/signin', {
			email,
			password,
			remember
		});
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
	}
}

export async function fetchProfile() {
	try {
		const response = await api.get('/users/profile');
		return response.data;
	} catch (error) {
		const status = error.response?.status;
		const message = error.response?.data?.error || `Error HTTP: ${status}`;
		if (status === 401) {
			throw new Error('Sesión inválida. Por favor, inicia sesión nuevamente.');
		} else if (status === 403) {
			throw new Error(
				message === 'User not verified'
					? 'Cuenta no verificada. Verifica tu correo electrónico.'
					: 'Acceso denegado.'
			);
		} else if (status === 404) {
			throw new Error('Usuario no encontrado.');
		}
		throw new Error(message);
	}
}

export async function logout() {
	try {
		const response = await api.post('/auth/logout');
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.error || 'Error al cerrar sesión');
	}
}

export async function refreshToken() {
	try {
		const response = await api.post('/auth/refresh');
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.error || 'Error al refrescar el token');
	}
}
