<script>
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let error = null;

  onMount(async () => {
    if (!browser) return;

    const params = new URLSearchParams(window.location.search);
    const verificationRequired = params.get('verificationRequired') === 'true';
    const verificationToken = params.get('verificationToken');
    const verificationCodeExpiresAt = params.get('verificationCodeExpiresAt');
    const profile = params.get('profile');

    console.log("Profile uri string: ", profile);

    
    if (verificationRequired) {
      if (!verificationToken || !verificationCodeExpiresAt) {
        error = 'Faltan parámetros de verificación';
        return;
      }
      goto(`/auth/verify?expiresAt=${verificationCodeExpiresAt}&token=${verificationToken}`);
      return;
    }

    if (!profile) {
      error = 'Faltan datos del perfil';
      return;
    }

    try {
      const userProfile = JSON.parse(profile);

      authStore.set(userProfile);
      if (browser) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(userProfile));
      }

      goto('/private/dashboard');
    } catch (err) {
      error = 'Error al procesar el perfil del usuario';
      console.error('Error parsing profile:', err);
    }
  });
</script>

<main class="flex flex-col items-center justify-center h-screen">
  {#if error}
    <p class="text-red-500 font-bold">{error}</p>
  {:else}
    <p>Procesando autenticación con Google...</p>
  {/if}
</main>