<script>
  import { goto } from '$app/navigation';
  import { PUBLIC_API_URL } from '$env/static/public';

  function handleGoogleLogin() {
    window.location = `${PUBLIC_API_URL}/auth/google/login`;
  }
</script>

<button 
  type="button" 
  onclick={handleGoogleLogin}
  class="relative cursor-pointer transition-all duration-300 hover:shadow-2xl border-1 border-light-gray bg-white text-black font-bold py-2 px-4 rounded-md h-[58px]" 
>
  <img src="/devicon_google.svg" alt="google icon" class="inline-block mr-2 h-10 w-10 absolute left-6 top-1/2 transform -translate-y-1/2" />
  Continuar con Google
</button>
