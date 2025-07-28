<script>
    import { userStore, fetchUserProfile } from '$lib/stores/user';

    let error = null;

    async function loadProfile() {
        try {
            await fetchUserProfile();
        } catch (err) {
            error = err.message;
        }
    }

    loadProfile();
</script>

<main>
    <h1>Dashboard Page</h1>
    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
    {#if $userStore}
        <p>Bienvenido, {$userStore.firstName} {$userStore.lastName}</p>
        <p>Profile: {JSON.stringify($userStore)}</p>
    {/if}
</main>
