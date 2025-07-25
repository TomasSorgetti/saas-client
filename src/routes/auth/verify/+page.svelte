<script>
    import { enhance } from '$app/forms';

    import FormButton from "$lib/components/buttons/FormButton.svelte";
	import VerificationInput from "$lib/components/VerificationInput.svelte";

    async function handleCodeComplete(code) {
        const response = await fetch('/auth/verify', {
            method: 'POST',
            body: new FormData(document.querySelector('#verify-form')),
        });

        const result = await response.json();

        console.log(result);
            
    }

</script>

<main class="flex flex-col items-center justify-center h-screen p-4">
    <p>Luthier <span>Stock</span></p>
    <h1 class="text-5xl font-bold">Verificar código</h1>

    <form id="verify-form" use:enhance method="POST" class="flex flex-col items-center gap-4  mt-28">

        <VerificationInput onComplete={handleCodeComplete}/>

        <p class="my-6">El códo expira en: <span class="font-bold">00:00</span></p>

        <div class="w-full max-w-[450px] flex flex-col gap-4 text-center">
            <FormButton type="button" primary>Verificar cuenta</FormButton>
            <p>No reciviste el código: <button type="button" class="cursor-pointer font-bold underline">Reenviar</button></p>
        </div>
    </form>
</main>