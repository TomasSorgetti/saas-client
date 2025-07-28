import { writable } from 'svelte/store';
import { login, fetchProfile, logout } from '$lib/api/auth';

export const userStore = writable(null);

export async function loginUser(email, password, remember) {
	try {
		const user = await login(email, password, remember);
		await fetchProfile();
		return user;
	} catch (error) {
		userStore.set(null);
		throw error;
	}
}

export async function fetchUserProfile() {
	try {
		const profile = await fetchProfile();
		userStore.set(profile);
		return profile;
	} catch (error) {
		userStore.set(null);
		throw error;
	}
}

export async function logoutUser() {
	try {
		await logout();
		userStore.set(null);
	} catch (error) {
		userStore.set(null);
		throw error;
	}
}
