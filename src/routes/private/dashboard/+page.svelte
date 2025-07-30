<script>
	import { browser } from '$app/environment';
  import { authStore } from '$lib/stores/auth';
	import { onMount } from 'svelte';

  onMount(()=>{
    if(browser && $authStore){
      console.log($authStore);
    }
  })
</script>

<main class="mt-32 p-4">
    <h1>Dashboard Page</h1>
    {#if $authStore}
    <h2>Bienvenido, {$authStore.email}</h2>
    <p>ID de usuario: {$authStore.id}</p>
    {:else}
    <p>No hay usuario autenticado</p>
    {/if}
</main>
