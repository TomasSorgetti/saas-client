<script>
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import VerificationInput from '$lib/components/VerificationInput.svelte';
    import { resendEmailCode, verifyEmail } from '$lib/api/auth.js';
    import { goto } from '$app/navigation';
    import { PUBLIC_API_URL } from '$env/static/public';
    import { onMount } from 'svelte';

    let errors = { general: '' };
    let isSubmitting = false;
    let timeLeft = '15:00';
    let token = '';
    let expirationTime = null;

    onMount(() => {
        // Get token and expiration from URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get('token');
        const expiresAt = urlParams.get('expiresAt');

        if (!token || !expiresAt) {
            errors.general = 'Faltan token o tiempo de expiración';
            return;
        }

        // Parse expiration time
        try {
            expirationTime = new Date(expiresAt);
            if (isNaN(expirationTime)) {
                throw new Error('Invalid expiration date');
            }
        } catch (e) {
            console.error('Error parsing expiresAt:', e);
            errors.general = 'Tiempo de expiración inválido';
            return;
        }

        // Update countdown timer
        const updateTimer = () => {
            if (!expirationTime) return;
            const now = new Date();
            const diff = expirationTime - now;
            if (diff <= 0) {
                timeLeft = '00:00';
                errors.general = 'El código ha expirado';
                return;
            }
            const minutes = Math.floor(diff / 1000 / 60);
            const seconds = Math.floor((diff / 1000) % 60);
            timeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            setTimeout(updateTimer, 1000);
        };
        updateTimer();
    });

    async function handleCodeComplete(code) {
        if (isSubmitting || !token) return;
        isSubmitting = true;
        errors = { general: '' };

        try {
            const response = await verifyEmail(code, token);
            if (response) {
                goto('/auth/login');
            } else {
                errors = { general: response.error || 'Error al verificar el código' };
                isSubmitting = false;
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            errors = { general: error.message || 'Error de conexión al verificar el código' };
            isSubmitting = false;
        }
}

    async function handleResend() {
        if (!token) {
            errors = { general: 'No se proporcionó un token de verificación' };
            return;
        }

        try {
            const response = await resendEmailCode(token)
            
            if (response.verificationCodeExpiresAt) {
                expirationTime = new Date(response.verificationCodeExpiresAt);
                if (isNaN(expirationTime)) {
                    throw new Error('Invalid expiration date');
                }
                token = response.verificationToken;
                goto(`/auth/verify?expiresAt=${response.verificationCodeExpiresAt}&token=${response.verificationToken}`);
                return
            }
            errors = { general: response.message || 'Error al reenviar el código' };
            return;
        } catch (error) {
            console.error('Error resending code:', error);
            errors = { general: 'Error de conexión al reenviar el código' };
        }
    }
</script>

<main class="flex flex-col items-center justify-center h-screen p-4">
    <p>Luthier <span>Stock</span></p>
    <h1 class="text-5xl font-bold">Verificar código</h1>

    {#if errors.general}
        <span class="text-red-500 text-xs mb-4">{errors.general}</span>
    {/if}

    <form id="verify-form" class="flex flex-col items-center gap-4 mt-28">
        <VerificationInput onComplete={handleCodeComplete} />

        <p class="my-6">El código expira en: <span class="font-bold">{timeLeft}</span></p>

        <div class="w-full max-w-[450px] flex flex-col gap-4 text-center">
            <FormButton type="button" primary disabled={isSubmitting || !token} onClick={() => document.querySelector('#verify-form input').focus()}>
                {isSubmitting ? 'Verificando...' : 'Verificar cuenta'}
            </FormButton>
            <p>No recibiste el código? <button type="button" class="cursor-pointer font-bold underline" on:click={handleResend}>Reenviar</button></p>
        </div>
    </form>
</main>