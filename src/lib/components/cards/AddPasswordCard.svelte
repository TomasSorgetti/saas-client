<script>
    export let hasPassword = false;

    function changePassword(){
        console.log("changing password...");
    }

    function addPassword(){
        console.log("adding password...");
    }
</script>


<article class="w-full bg-white rounded shadow-2xl p-6 flex items-center justify-between">
    <div>
        <h3 class="font-bold text-[24px]">
            Contraseña
        </h3>
        {#if hasPassword}
            <p class="mt-2">
                Has seteado una contraseña para la cuenta t******456@gmail.com
            </p>
        {:else}
            <p class="mt-2">
                Esta cuenta no tiene una contraseña vinculada.
            </p>
        {/if}
    </div>
    {#if hasPassword}
        <button 
            type="button" 
            onclick={changePassword}
            class="cursor-pointer px-14 py-2 font-bold rounded bg-gradient text-white"
        >
            Cambiar contraseña
        </button>
    {:else}
        <button 
            type="button" 
            onclick={addPassword}
            class="cursor-pointer px-14 py-2 font-bold rounded bg-gradient text-white"
        >
            Agregar contraseña
        </button>
    {/if}
</article>