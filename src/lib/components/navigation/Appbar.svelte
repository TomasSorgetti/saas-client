<script>
    import { authStore, logoutUser } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let isMobileMenuOpen = false;
    let isAccountOpen = false; // For mobile account toggle

    async function handleLogout() {
        try {
            await logoutUser();
            handleCloseMenu()
            goto('/auth/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    function handleOutsideClick(event) {
        if (isMobileMenuOpen && !event.target.closest('.menu') && !event.target.closest('.hamburger')) {
            isMobileMenuOpen = false;
            isAccountOpen = false;
        }
    }

    function handleCloseMenu (){
        isMobileMenuOpen = false;
        isAccountOpen = false;
    }

    onMount(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    });
</script>

<header class="fixed top-0 left-0 w-full bg-background text-black shadow-2xl z-90">
    <nav class="container mx-auto w-full flex items-center justify-between py-4 px-4">
        <!-- Logo and Plan -->
        <div class="flex items-center gap-2">
            <a href="/" class="text-3xl font-bold">Rise AI</a>
            {#if $authStore.subscription.plan_name}
                <a
                    href="/private/account/plans"
                    class="px-2 py-0.5 font-bold text-[12px] text-white bg-[linear-gradient(90deg,_var(--primary-color),_var(--secondary-color))] rounded-full"
                    onclick={handleCloseMenu}
                >
                    {$authStore.subscription.plan_name}
                </a>
            {/if}
        </div>

        <!-- Hamburger Button -->
        <button
            class="md:hidden hamburger focus:outline-none"
            aria-label="Toggle menu"
            onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {#if isMobileMenuOpen}
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                {:else}
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                {/if}
            </svg>
        </button>

        <!-- Single Menu -->
        <ul
            class="menu flex flex-col md:flex-row md:items-center gap-4 md:gap-6 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-2xl md:shadow-none p-4 md:p-0 {isMobileMenuOpen ? 'block' : 'hidden md:flex'}"
        >
            <li >
                <a href="/private/dashboard/#" class="hover:text-gray-600" onclick={handleCloseMenu}>Item</a>
            </li>
            <li >
                <a href="/private/dashboard/#" class="hover:text-gray-600" onclick={handleCloseMenu}>Item</a>
            </li>
            <li >
                <a href="/private/dashboard/#" class="hover:text-gray-600" onclick={handleCloseMenu}>Item</a>
            </li>
            <li class="relative group">
                <button
                    class="flex items-center gap-2 md:bg-gray-400 md:rounded-full md:h-10 md:w-10 md:text-transparent font-bold md:font-normal"
                    onclick={() => (isAccountOpen = !isAccountOpen)}
                >
                    Account
                    <svg
                        class="w-4 h-4 md:hidden"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d={isAccountOpen ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}
                        />
                    </svg>
                </button>
                <ul
                    class="flex-col gap-2 mt-2 md:mt-0 pl-4 md:pl-0 lg:absolute lg:right-0 lg:top-full md:bg-white md:shadow-2xl md:rounded md:p-4 md:min-w-[120px] {isAccountOpen ? 'flex' : 'hidden'} md:hidden md:group-hover:flex lg:p-4"
                    style="md:margin-top: -2px;"
                    transition:fade={{ duration: 200 }}
                >
                    <li >
                        <a href="/private/account" class="hover:text-gray-600" onclick={handleCloseMenu}>Account</a>
                    </li>
                    <li>
                        <a href="/private/account/billing" class="hover:text-gray-600" onclick={handleCloseMenu}>Billing</a>
                    </li>
                    <li>
                        <button
                            onclick={handleLogout}
                            aria-label="logout"
                            class="text-left hover:text-gray-600"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</header>

<style>
    :global(.group:hover .group-hover\:flex) {
        display: flex;
    }
</style>