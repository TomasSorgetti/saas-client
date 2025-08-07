<script>
    import { authStore } from '$lib/stores/auth';
	import AddGoogleCard from "$lib/components/cards/AddGoogleCard.svelte";
	import AddPasswordCard from "$lib/components/cards/AddPasswordCard.svelte";
	import TwoFACard from '$lib/components/cards/TwoFACard.svelte';
</script>

<div class="w-full">
    <h1 class="font-bold text-4xl">Contraseña y seguridad</h1>
    <section class="w-full flex flex-col gap-4 items-start mt-10">
        <h2 class="font-bold text-3xl">Inicio de sesión</h2>
        
        <AddPasswordCard hasPassword={$authStore && $authStore.has_password}/>
        
        <AddGoogleCard isLinked={$authStore && $authStore.login_method == "google"}/>
        
        <TwoFACard />
    </section>
    
    <section class="w-full flex flex-col gap-4 items-start mt-10">
        <h2 class="font-bold text-3xl">Sesiones</h2>
    </section>
</div>