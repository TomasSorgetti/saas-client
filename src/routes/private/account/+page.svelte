<script>
	import { browser } from '$app/environment';
	import ProfileCard from '$lib/components/subscription/ProfileCard.svelte';
  import { authStore } from '$lib/stores/auth';
	import { onMount } from 'svelte';

  onMount(()=>{
    if(browser && $authStore){
      console.log($authStore);
    }
  })
</script>

<ProfileCard planName={$authStore.subscription.plan_name} description="Streamline inventory, predict demand, and boost sales with AI. Manage orders, events, and recipes effortlessly in one simple platform." />
<h1 class="text-5xl font-bold mt-10">Perfil de usuario</h1>
{#if $authStore}
  <ul class="flex flex-col gap-2 items-start mt-8">
    <li class="font-bold">Email: <span class="font-medium">{$authStore.email}</span></li>
    <li class="font-bold">Nombre: <span class="font-medium">{$authStore.first_name}</span></li>
    <li class="font-bold">Apellido: <span class="font-medium">{$authStore.last_name}</span></li>
    <li class="font-bold">Nombre de empresa: <span class="font-medium">{$authStore.workshop_name}</span></li>
    <li class="font-bold">Celular: <span class="font-medium">{$authStore.phone}</span></li>
    <li class="font-bold">Dirección: <span class="font-medium">{$authStore.address}</span></li>
    <li class="font-bold">País: <span class="font-medium">{$authStore.country}</span></li>
    {#if $authStore.provider !== "google"}
      <li class="mt-10">
        <a href="/private/account/change-password" class="underline font-bold">Cambiar contraseña</a>
      </li>
    {/if}
  </ul>
{:else}
<p>No hay usuario autenticado</p>
{/if}

