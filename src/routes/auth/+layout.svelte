<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { authStore, fetchUserProfile } from '$lib/stores/auth';

  let loading = true;

  onMount(async () => {
    if (browser) {
      let user;
      authStore.subscribe((value) => {
        user = value;
      })();

      if (localStorage.getItem('isAuthenticated') === 'true' && !user) {
        try {
          await fetchUserProfile();
          goto('/private/dashboard', { replaceState: true });
        } catch (error) {
          authStore.set(null);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
        }
      } else if (user) {
        goto('/private/dashboard', { replaceState: true });
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