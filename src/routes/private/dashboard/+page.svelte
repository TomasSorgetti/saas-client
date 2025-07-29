<script>
  import { authStore } from '$lib/stores/auth';

</script>

<main>
    <h1>Dashboard Page</h1>
    {#if $authStore}
    <h2>Bienvenido, {$authStore.email}</h2>
    <p>ID de usuario: {$authStore.id}</p>
    {:else}
    <p>No hay usuario autenticado</p>
    {/if}
</main>
