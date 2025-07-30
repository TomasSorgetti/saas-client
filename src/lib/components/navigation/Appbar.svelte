<script>
    import { authStore, logoutUser } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    
    async function handleLogout (){
        try{
            await logoutUser()
            goto('/auth/login');
        }catch(error){
            console.log(error);
        }
    }
</script>
<header class="fixed top-0 left-0 w-full bg-black text-white">
    <nav class="container mx-auto w-full flex items-center justify-between py-4">
        <a href="/">Rise AI</a>
        <ul class="flex items-center gap-4">
            <li>
                <a href="/private/dashboard/#">item</a>
            </li>
            <li>
                <a href="/private/dashboard/#">item</a>
            </li>
            <li>
                <a href="/private/dashboard/#">item</a>
            </li>
            <li>
                {#if $authStore}
                    <button onclick={handleLogout} class="cursor-pointer">logout</button>
                {:else}
                    <a href="/auth/register" class="bg-[linear-gradient(90deg,_var(--primary-color),_var(--secondary-color))] text-white py-2 px-6 font-bold rounded">Try it free</a>
                {/if}
            </li>
        </ul>
    </nav>
</header>