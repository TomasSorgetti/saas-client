<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores'; 
  import { loginUser } from '$lib/stores/auth';
  import FormButton from '$lib/components/buttons/FormButton.svelte';
  import GoogleButton from '$lib/components/buttons/GoogleButton.svelte';

  let email = '';
  let password = '';
  let remember = false;
  let error = null;

  $: urlError = $page.url.searchParams.get('error') || null;
  $: urlMessage = $page.url.searchParams.get('message') || null;

  $: displayError = urlMessage || error;

  function clearError() {
    error = null;
    if (urlError || urlMessage) {
      const url = new URL(window.location);
      url.searchParams.delete('error');
      url.searchParams.delete('message');
      window.history.replaceState({}, '', url);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    clearError(); 
    try {
      const response = await loginUser(email, password, remember);
      if (response.verificationRequired) {
        goto(`/auth/verify?expiresAt=${response.verificationCodeExpiresAt}&token=${response.verificationToken}`);
      } else {
        goto('/private/dashboard');
      }
    } catch (err) {
      error = err.message;
    }
  }
</script>

<main class="flex flex-col items-center justify-center h-screen">
  <p>Luthier <span>Stock</span></p>
  <h1 class="text-5xl font-bold mb-12 text-red-gray">Iniciar Sesión</h1>
  <form on:submit={handleLogin} autocomplete="on" class="flex flex-col gap-4 w-full max-w-[400px]">
    {#if displayError}
      <p class="p-4 text-red-500">{displayError}</p>
    {/if}
    <GoogleButton />
    <label for="email" class="flex flex-col gap-1">
      Email:
      <input
        type="email"
        name="email"
        id="email"
        placeholder="abc@gmail.com"
        autocomplete="email"
        bind:value={email}
        class="h-[48px] border-1 border-light-gray rounded-md px-2 placeholder:text-medium-gray shadow-xl mb-4"
      />
    </label>
    <label for="password" class="flex flex-col gap-1">
      Contraseña:
      <input
        type="password"
        name="password"
        id="password"
        placeholder="********"
        autocomplete="current-password"
        bind:value={password}
        class="h-[48px] border-1 border-light-gray rounded-md px-2 placeholder:text-medium-gray shadow-xl mb-4"
      />
    </label>
    <label for="remember" class="flex items-center gap-2 mb-4 display-inline-block cursor-pointer">
      <input
        type="checkbox"
        name="remember"
        id="remember"
        bind:checked={remember}
        class="h-[20px] w-[20px] cursor-pointer accent-primary"
      />
      Permanecer conectado
    </label>
    <FormButton type="submit" primary>Iniciar sesión</FormButton>
    <p class="text-center text-medium-gray">
      ¿No tienes cuenta? <a href="/auth/register" class="font-bold underline text-black hover:text-primary">Regístrate</a>
    </p>
  </form>
</main>