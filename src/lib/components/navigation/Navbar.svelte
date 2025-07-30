<script>
    import { authStore } from '$lib/stores/auth';

</script>
<header class="fixed top-0 left-0 w-full bg-black text-white">
    <nav class="container mx-auto w-full flex items-center justify-between py-4">
        <a href="/">Rise AI</a>
        <ul class="flex items-center gap-4">
            <li>
                <a href="/#">Why choose us</a>
            </li>
            <li>
                <a href="/#">Pricing</a>
            </li>
            {#if $authStore}
                <li>
                    <a href="/private/dashboard" class="bg-[linear-gradient(90deg,_var(--primary-color),_var(--secondary-color))] text-white py-2 px-6 font-bold rounded">Go to app</a>
                </li>
            {:else}
                <li>
                    <a href="/">Inicio</a>
                </li>
                <li>
                    <a href="/auth/register">Try it now</a>
                </li>
            {/if}
        </ul>
    </nav>
</header>