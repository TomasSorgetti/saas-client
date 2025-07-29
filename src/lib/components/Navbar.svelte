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
<header>
    <a href="/">Luthier Stock</a>
    <nav>
        {#if $authStore}
            <a href="/private/dashboard">Dashboard</a>
            <button onclick={handleLogout}>Logout</button>
        {:else}
            <a href="/">Inicio</a>
            <a href="/auth/register">Try it now</a>
        {/if}
    </nav>
</header>