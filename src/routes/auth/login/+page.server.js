import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password) {
			return fail(400, { error: 'Faltan datos' });
		}

		const res = await fetch(`${PUBLIC_API_URL}/auth/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
			credentials: 'include'
		});

		console.log('Login response: ', res);

		if (!res.ok) {
			return fail(401, { error: 'Credenciales inválidas' });
		}

		throw redirect(303, '/');
	}
};
