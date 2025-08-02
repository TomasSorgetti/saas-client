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
        <div class="flex items-center gap-2">
            <a href="/" class="text-3xl font-bold">Rise AI</a>
            {#if $authStore.subscription.plan_name}
                <a href="/private/account/plans" class="px-2 py-0.5 font-bold text-[12px] text-white bg-[linear-gradient(90deg,_var(--primary-color),_var(--secondary-color))] rounded-full">{$authStore.subscription.plan_name}</a>
            {/if}
        </div>
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
                {/if}
            </li>
            <li>
                <a href="/private/account/billing" class="bg-[linear-gradient(90deg,_var(--primary-color),_var(--secondary-color))] text-white py-3 px-6 font-bold rounded">Upgrade plan</a>
            </li>
        </ul>
    </nav>
</header>