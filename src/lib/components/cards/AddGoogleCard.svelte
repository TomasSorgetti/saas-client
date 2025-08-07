<script>
  import { goto } from '$app/navigation';
  import { PUBLIC_API_URL } from '$env/static/public';

  export let isLinked = false;

</script>


<article class="w-full bg-white rounded shadow-2xl p-6 flex items-center justify-between">
    <div>
        <h3 class="font-bold text-[24px]">
            Login con Google
        </h3>
        {#if isLinked}
            <p class="mt-2">
                Esta cuenta ya se encuentra vinculada con google.
            </p>
        {:else}
            <p class="mt-2">
                Esta cuenta no está vinculada con google.
            </p>
        {/if}
    </div>
    <a 
    href={`${PUBLIC_API_URL}/auth/google/link`}
    class="cursor-pointer px-14 py-2 font-bold rounded bg-gradient text-white"
    >
     Conectar con Google
    </a>
</article>