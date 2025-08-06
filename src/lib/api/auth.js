import { publicApi, authApi } from './index';

export async function login(email, password, remember = false) {
	try {
		const response = await publicApi.post('/auth/signin', {
			email,
			password,
			remember
		});
		console.log('Response', response);

		return response.data;
	} catch (error) {
		console.log('Error', error);
		if (error.response?.status === 429) {
			throw new Error('Demasiados intentos, prueba más tarde.');
		}
		throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
	}
}

export async function register(formData) {
	try {
		const response = await publicApi.post('/auth/signup', {
			email: formData.email,
			firstName: formData.firstName,
			lastname: formData.lastname,
			workshopName: formData.workshopName,
			phone: formData.phone,
			address: formData.address,
			country: formData.country,
			password: formData.password
		});

		return response.data;
	} catch (error) {
		if (error.response?.status === 429) {
			throw new Error('Demasiados intentos, prueba más tarde.');
		}
		throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
	}
}

export async function fetchProfile() {
	try {
		const response = await authApi.get('/users/profile');
		return response.data;
	} catch (error) {
		const status = error.response?.status;
		const message = error.response?.data?.error || `Error HTTP: ${status}`;
		if (status === 403) {
			throw new Error(
				message === 'User not verified'
					? 'Cuenta no verificada. Verifica tu correo electrónico.'
					: 'Acceso denegado.'
			);
		} else if (status === 404) {
			throw new Error('Usuario no encontrado.');
		} else if (status === 429) {
			throw new Error('Demasiados intentos, prueba más tarde.');
		}
		throw new Error(message);
	}
}

export async function logout() {
	try {
		const response = await publicApi.post('/auth/logout');
		console.log('Response: ', response);

		return response.data;
	} catch (error) {
		console.log(error.message, error);

		if (error.response?.status === 429) {
			throw new Error('Demasiados intentos, prueba más tarde.');
		}
		throw new Error(error.response?.data?.error || 'Error al cerrar sesión');
	}
}

export async function refresh() {
	try {
		const response = await publicApi.post('/auth/refresh');
		return response.data;
	} catch (error) {
		if (error.response?.status === 429) {
			throw new Error('Demasiados intentos, prueba más tarde.');
		}
		throw new Error(error.response?.data?.error || 'Error al refrescar el token');
	}
}

export async function verifyEmail(code, token) {
	try {
		const response = await publicApi.post('/auth/verify-email', {
			verification_token: token,
			verification_code: code
		});
		return response.data;
	} catch (error) {
		if (error.response?.data?.details) {
			throw new Error('Código incorrecto');
		}
		throw new Error(error.response?.data?.error || 'Error al verificar el email');
	}
}

export async function resendEmailCode(token) {
	try {
		const response = await publicApi.post('/auth/resend-code', {
			verification_token: token
		});

		return response.data;
	} catch (error) {
		if (error.response?.status === 429) {
			throw new Error('Demasiados intentos, prueba más tarde.');
		}
		throw new Error(error.response?.data?.error || 'Error al verificar el email');
	}
}

export async function checkEmailInDb(email) {
	try {
		const response = await publicApi.post('/auth/check-email', {
			email
		});

		return response.data;
	} catch (error) {
		if (error.response?.status === 429) {
			throw new Error('Demasiados intentos, prueba más tarde.');
		}
		throw new Error(error.response?.data?.error || 'Error al checkear el email');
	}
}
