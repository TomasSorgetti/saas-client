<script>
  import { goto } from '$app/navigation';
  import { loginUser } from '$lib/stores/auth'; // Importar loginUser
  import FormButton from '$lib/components/buttons/FormButton.svelte';
  import GoogleButton from '$lib/components/buttons/GoogleButton.svelte';

  let email = '';
  let password = '';
  let remember = false;
  let error = null;

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await loginUser(email, password, remember);
      goto('/private/dashboard');
    } catch (err) {
      error = err.message;
      console.error('Error al iniciar sesión:', err.message);
    }
  }
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <p>Luthier <span>Stock</span></p>
    <h1 class="text-5xl font-bold mb-12 text-red-gray">Iniciar Sesión</h1>
    <form on:submit={handleLogin} class="flex flex-col gap-4 w-full max-w-[400px]">
        {#if error}
            <p class="text-red-500 font-bold">{error}</p>
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