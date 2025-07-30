<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { authStore, fetchUserProfile } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	let loading = true;

	onMount(async () => {
		if (browser && localStorage.getItem('isAuthenticated') === 'true') {
		try {
			await fetchUserProfile();
			
		} catch (error) {
			goto('/auth/login');
		}
		} 
		loading = false;
	});
</script>

{#if loading}
	<div class="flex items-center justify-center h-screen">
		<p>Cargando...</p>
	</div>
{:else}
  	<slot />
{/if}