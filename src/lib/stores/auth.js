// lib/stores/auth.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment'; // Importar browser para detectar el entorno
import { login, fetchProfile, logout, refresh } from '$lib/api/auth';

export const authStore = writable(
	browser && localStorage.getItem('isAuthenticated') === 'true'
		? JSON.parse(localStorage.getItem('user') || '{}') || null
		: null
);

export async function loginUser(email, password, remember) {
	try {
		const profile = await login(email, password, remember);
		authStore.set(profile);
		if (browser) {
			localStorage.setItem('isAuthenticated', 'true');
			localStorage.setItem('user', JSON.stringify(profile));
		}
		return profile;
	} catch (error) {
		authStore.set(null);
		if (browser) {
			localStorage.removeItem('isAuthenticated');
			localStorage.removeItem('user');
		}
		throw error;
	}
}

export async function fetchUserProfile() {
	try {
		const profile = await fetchProfile();
		authStore.set(profile);
		if (browser) {
			localStorage.setItem('isAuthenticated', 'true');
			localStorage.setItem('user', JSON.stringify(profile));
		}
		return profile;
	} catch (error) {
		authStore.set(null);
		if (browser) {
			localStorage.removeItem('isAuthenticated');
			localStorage.removeItem('user');
		}
		throw error;
	}
}

export async function logoutUser() {
	try {
		await logout();
		authStore.set(null);
		if (browser) {
			localStorage.removeItem('isAuthenticated');
			localStorage.removeItem('user');
		}
	} catch (error) {
		authStore.set(null);
		if (browser) {
			localStorage.removeItem('isAuthenticated');
			localStorage.removeItem('user');
		}
		throw error;
	}
}

export async function refreshToken() {
	try {
		const profile = await refresh();
		authStore.set(profile);
		if (browser) {
			localStorage.setItem('isAuthenticated', 'true');
			localStorage.setItem('user', JSON.stringify(profile));
		}
		return profile;
	} catch (error) {
		authStore.set(null);
		if (browser) {
			localStorage.removeItem('isAuthenticated');
			localStorage.removeItem('user');
		}
		throw error;
	}
}
