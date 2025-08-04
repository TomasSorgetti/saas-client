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
<h1 class="text-5xl font-bold mt-10">Información de usuario</h1>
<section class="w-full">
  {#if $authStore}
    <article class="relative bg-white rounded shadow-2xl p-8 w-full mt-10">
      <button class="absolute top-4 right-5 cursor-pointer">
        <img src="/edit.png" alt="edit icon">
      </button>
      <h2 class="font-bold text-2xl">Cuenta de usuario</h2>
      <ul class="flex flex-col gap-4 items-start mt-8">
        <li class="font-bold flex flex-col items-start">Id de usuario: <span class="font-light">{$authStore.id}</span></li>
        <li class="font-bold flex flex-col items-start">Nombre: <span class="font-light">{$authStore.first_name}</span></li>
        <li class="font-bold flex flex-col items-start">Apellido: <span class="font-light">{$authStore.last_name}</span></li>
        <li class="font-bold flex flex-col items-start">Email: <span class="font-light">{$authStore.email}</span></li>
        
        <li>
          <button class="text-red-500 cursor-pointer font-bold">Eliminar cuenta</button>
        </li>
      </ul>
    </article>
    
    <article class="relative bg-white rounded shadow-2xl p-8 w-full mt-10">
      <button class="absolute top-4 right-5 cursor-pointer">
        <img src="/edit.png" alt="edit icon">
      </button>
      <h2 class="font-bold text-2xl">Información adicional</h2>
      <ul class="flex flex-col gap-4 items-start mt-8">
        <li class="font-bold flex flex-col items-start">Nombre de empresa: <span class="font-light">{$authStore.workshop_name}</span></li>
        <li class="font-bold flex flex-col items-start">Dirección: <span class="font-light">{$authStore.address}</span></li>
        <li class="font-bold flex flex-col items-start">País: <span class="font-light">{$authStore.country}</span></li>
        <li class="font-bold flex flex-col items-start">Celular: <span class="font-light">{$authStore.phone}</span></li>
      </ul>
    </article>
  {:else}
  <p>No hay usuario autenticado</p>
  {/if}
</section>

