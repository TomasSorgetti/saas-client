import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const code1 = data.get('code-1');
		const code2 = data.get('code-2');
		const code3 = data.get('code-3');
		const code4 = data.get('code-4');
		const code5 = data.get('code-5');
		const code6 = data.get('code-6');
		const code = `${code1}${code2}${code3}${code4}${code5}${code6}`;

		console.log(`Código de verificación: ${code}`);

		return code;
		// const res = await fetch(`${PUBLIC_API_URL}/auth/verify-email`, {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ code })
		// });

		// if (!res.ok) {
		// 	return fail(401, { error: 'Código de verificación inválido' });
		// }

		// throw redirect(303, '/');
	}
};
