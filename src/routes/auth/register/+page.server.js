import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

async function checkEmailInDatabase(email) {
	const response = await fetch(`${PUBLIC_API_URL}/auth/check-email`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email })
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error('Error al verificar el email en la API');
	}

	return result.exists === true;
}

export const actions = {
	checkEmail: async ({ request }) => {
		try {
			const data = await request.formData();
			const email = data.get('email');

			if (!email) {
				return fail(400, { errors: { email: 'El email es obligatorio' } });
			}
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				return fail(400, { errors: { email: 'Email inválido' } });
			}

			const emailExists = await checkEmailInDatabase(email);
			if (emailExists) {
				return fail(400, { errors: { email: 'El email ya está registrado' } });
			}

			return { success: true };
		} catch (error) {
			console.error('Error en la acción checkEmail:', error);
			return fail(500, { errors: { email: 'Error del servidor al verificar el email' } });
		}
	},

	register: async ({ request }) => {
		try {
			const data = await request.formData();
			const formData = {
				email: data.get('email'),
				firstName: data.get('firstName'),
				lastname: data.get('lastname'),
				workshopName: data.get('workshopName'),
				phone: data.get('phone'),
				address: data.get('address'),
				country: data.get('country'),
				password: data.get('password'),
				confirmPassword: data.get('confirmPassword')
			};

			const errors = {};
			if (!formData.email) errors.email = 'El email es obligatorio';
			if (!formData.firstName) errors.firstName = 'El nombre es obligatorio';
			if (!formData.lastname) errors.lastname = 'El apellido es obligatorio';
			if (!formData.workshopName) errors.workshopName = 'La empresa es obligatoria';
			if (!formData.phone) errors.phone = 'El teléfono es obligatorio';
			if (!formData.address) errors.address = 'La dirección es obligatoria';
			if (!formData.country) errors.country = 'El país es obligatorio';
			if (!formData.password) errors.password = 'La contraseña es obligatoria';
			if (formData.password !== formData.confirmPassword)
				errors.confirmPassword = 'Las contraseñas no coinciden';

			if (Object.keys(errors).length > 0) {
				return fail(400, { errors, formData });
			}

			throw redirect(303, '/auth/login');
		} catch (error) {
			console.error('Error en la acción register:', error);
			return fail(500, { errors: { general: 'Error del servidor al registrar el usuario' } });
		}
	}
};
