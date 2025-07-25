<script>
  export let disabled = false;
</script>

<button 
  type="button" 
  class="relative cursor-pointer transition-all duration-300 hover:shadow-2xl border-1 border-light-gray bg-white text-black font-bold py-2 px-4 rounded-md h-[58px] {disabled ? 'opacity-50 cursor-not-allowed' : ''}" 
  disabled={disabled}
>
  <img src="/devicon_google.svg" alt="google icon" class="inline-block mr-2 h-10 w-10 absolute left-6 top-1/2 transform -translate-y-1/2" />
  Continuar con Google
</button>
