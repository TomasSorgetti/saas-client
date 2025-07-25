<script>
    import { enhance } from '$app/forms';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import GoogleButton from '$lib/components/buttons/GoogleButton.svelte';

    let stage = 1;
    let formData = {
        email: '',
        firstName: '',
        lastname: '',
        workshopName: '',
        phone: '',
        address: '',
        country: '',
        password: '',
        confirmPassword: ''
    };
    let errors = {
        email: '',
        firstName: '',
        lastname: '',
        workshopName: '',
        phone: '',
        address: '',
        country: '',
        password: '',
        confirmPassword: ''
    };
    let isCheckingEmail = false;
    let emailVerified = false;

    function validateField(field) {
        let isValid = true;
        switch (field) {
            case 'email':
                errors = { ...errors, email: !formData.email
                    ? 'El email es obligatorio'
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                        ? 'Email inválido'
                        : '' };
                isValid = !errors.email;
                break;
            case 'firstName':
                errors = { ...errors, firstName: !formData.firstName ? 'El nombre es obligatorio' : '' };
                isValid = !errors.firstName;
                break;
            case 'lastname':
                errors = { ...errors, lastname: !formData.lastname ? 'El apellido es obligatorio' : '' };
                isValid = !errors.lastname;
                break;
            case 'workshopName':
                errors = { ...errors, workshopName: !formData.workshopName ? 'La empresa es obligatoria' : '' };
                isValid = !errors.workshopName;
                break;
            case 'phone':
                errors = { ...errors, phone: !formData.phone
                    ? 'El teléfono es obligatorio'
                    : !/^\+?\d{7,15}$/.test(formData.phone)
                        ? 'Teléfono inválido'
                        : '' };
                isValid = !errors.phone;
                break;
            case 'address':
                errors = { ...errors, address: !formData.address ? 'La dirección es obligatoria' : '' };
                isValid = !errors.address;
                break;
            case 'country':
                errors = { ...errors, country: !formData.country ? 'El país es obligatorio' : '' };
                isValid = !errors.country;
                break;
            case 'password':
                errors = { ...errors, password: !formData.password
                    ? 'La contraseña es obligatoria'
                    : formData.password.length < 6
                        ? 'Mínimo 6 caracteres'
                        : '' };
                isValid = !errors.password;
                break;
            case 'confirmPassword':
                errors = { ...errors, confirmPassword: !formData.confirmPassword
                    ? 'Confirma tu contraseña'
                    : formData.confirmPassword !== formData.password
                        ? 'Las contraseñas no coinciden'
                        : '' };
                isValid = !errors.confirmPassword;
                break;
        }
        return isValid;
    }

    function validateStep() {
        if (stage === 1) {
            validateField('email');
            validateField('firstName');
            validateField('lastname');
            return !errors.email && !errors.firstName && !errors.lastname;
        }
        if (stage === 2) {
            validateField('workshopName');
            validateField('phone');
            validateField('address');
            validateField('country');
            return !errors.workshopName && !errors.phone && !errors.address && !errors.country;
        }
        if (stage === 3) {
            validateField('password');
            validateField('confirmPassword');
            return !errors.password && !errors.confirmPassword;
        }
        return true;
    }

    async function checkEmail() {
        const isValid = validateField('email');
        if (!isValid) {
            return false;
        }

        isCheckingEmail = true;
        errors = { ...errors, email: '' };

        try {
            const response = await fetch('/auth/register?/checkEmail', {
                method: 'POST',
                body: new FormData(document.querySelector('#register-form')),
            });

            const result = await response.json();

            isCheckingEmail = false;

            if (result.type === 'failure' || !response.ok) {
                let errorMessage = 'Error al verificar el email';
                if (typeof result.data === 'string') {
                    try {
                        const parsedData = JSON.parse(result.data);
                        errorMessage = parsedData.errors?.email || parsedData[2] || errorMessage;
                    } catch (e) {
                        console.error('Error al parsear result.data:', e);
                        errorMessage = result.data.includes('El email ya está registrado') 
                            ? 'El email ya está registrado' 
                            : errorMessage;
                    }
                } else {
                    errorMessage = result.errors?.email || result.data?.errors?.email || errorMessage;
                }
                errors = { ...errors, email: errorMessage };
                return false;
            }

            emailVerified = true;
            return true;
        } catch (error) {
            isCheckingEmail = false;
            errors = { ...errors, email: 'Error de conexión al verificar el email' };
            return false;
        }
    }

    async function nextStage() {
        if (stage === 1) {
            if (!validateStep()) {
                return;
            }
            const emailIsValid = await checkEmail();
            if (!emailIsValid) {
                return;
            }
        } else if (stage === 2 && !validateStep()) {
            return;
        }
        if (stage < 3) {
            stage += 1;
        }
    }

    function prevStage() {
        if (stage > 1) {
            stage -= 1;
            emailVerified = false;
        }
    }

    function handleSubmit({ form, action, result }) {
        if (result.type === 'failure') {
            errors = { ...errors, ...result.data?.errors };
            formData = { ...formData, ...result.data?.formData };
        }
    }
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <p>Luthier <span>Stock</span></p>
    <h1 class="text-5xl font-bold mb-12">Registrarse</h1>
    <form id="register-form" action="/auth/register?/register" method="POST" class="flex flex-col gap-0 w-full max-w-[400px]" use:enhance={handleSubmit}>
        <input type="hidden" name="emailVerified" value={emailVerified ? 'true' : 'false'} />
        {#if stage === 1}
            <GoogleButton />
            <label for="email" class="flex flex-col gap-1 relative mt-4">
                Email:
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="abc@gmail.com" 
                    class="h-[48px] border-1 border-light-gray rounded-md px-2 placeholder:text-medium-gray shadow-xl mb-4"
                    bind:value={formData.email}
                    on:blur={() => validateField('email')}
                >
                {#if errors.email}
                    <span class="text-red-500 text-xs absolute bottom-0 left-0">{errors.email}</span>
                {/if}
            </label>
            <label for="firstName" class="flex flex-col gap-1 relative">
                Nombre:
                <input 
                    type="text" 
                    name="firstName" 
                    id="firstName" 
                    placeholder="Tu nombre" 
                    class="h-[48px] border-1 border-light-gray rounded-md px-2 placeholder:text-medium-gray shadow-xl mb-4"
                    bind:value={formData.firstName}
                    on:blur={() => validateField('firstName')}
                >
                {#if errors.firstName}
                    <span class="text-red-500 text-xs absolute bottom-0 left-0">{errors.firstName}</span>
                {/if}
            </label>
            <label for="lastname" class="flex flex-col gap-1 relative mb-4">
                Apellido:
                <input 
                    type="text" 
                    name="lastname" 
                    id="lastname" 
                    placeholder="Tu apellido" 
                    class="h-[48px] border-1 border-light-gray rounded-md px-2 placeholder:text-medium-gray shadow-xl mb-4"
                    bind:value={formData.lastname}
                    on:blur={() => validateField('lastname')}
                >
                {#if errors.lastname}
                    <span class="text-red-500 text-xs absolute bottom-0 left-0">{errors.lastname}</span>
                {/if}
            </label>
            <FormButton 
                type="button" 
                onClick={nextStage} 
                primary 
                disabled={isCheckingEmail}
            >
                {isCheckingEmail ? 'Verificando...' : 'Siguiente'}
            </FormButton>
            <p class="text-center mt-2 text-medium-gray">¿Ya tienes cuenta? <a href="/auth/login" class="font-bold underline text-black">Iniciar sesión</a></p>
        {/if}
        {#if stage === 2}
            <label for="workshopName" class="flex flex-col gap-1 relative">
                Nombre de la empresa:
                <input 
                    type="text" 
                    name="workshopName" 
                    id="workshopName" 
                    placeholder="Tu empresa" 
                    class="h-[48px] border-1 border-light-gray rounded-md px-2 placeholder:text-medium-gray shadow-xl mb-4"
                    bind:value={formData.workshopName}
                    on:blur={() => validateField('workshopName')}
                >
                {#if errors.workshopName}
                    <span class="text-red-500 text-xs absolute bottom-0 left-0">{errors.workshopName}</span>
                {/if}
            </label>
            <label for="phone" class="flex flex-col gap-1 relative">
                Teléfono:
                <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    placeholder="Tu teléfono" 
                    class="h-[48px] border-1 border-light-gray rounded-md px-2 placeholder:text-medium-gray shadow-xl mb-4"
                    bind:value={formData.phone}
                    on:blur={() => validateField('phone')}
                >
                {#if errors.phone}
                    <span class="text-red-500 text-xs absolute bottom-0 left-0">{errors.phone}</span>
                {/if}
            </label>
            <label for="address" class="flex flex-col gap-1 relative">
                Dirección:
                <input 
                    type="text" 
                    name="address" 
                    id="address" 
                    placeholder="Tu dirección" 
                    class="h-[48px] border-1 border-light-gray rounded-md px-2 placeholder:text-medium-gray shadow-xl mb-4"
                    bind:value={formData.address}
                    on:blur={() => validateField('address')}
                >
                {#if errors.address}
                    <span class="text-red-500 text-xs absolute bottom-0 left-0">{errors.address}</span>
                {/if}
            </label>
            <label for="country" class="flex flex-col gap-1 relative">
                País:
                <input 
                    type="text" 
                    name="country" 
                    id="country" 
                    placeholder="Tu país" 
                    class="h-[48px] border-1 border-light-gray rounded-md px-2 placeholder:text-medium-gray shadow-xl mb-4"
                    bind:value={formData.country}
                    on:blur={() => validateField('country')}
                >
                {#if errors.country}
                    <span class="text-red-500 text-xs absolute bottom-0 left-0">{errors.country}</span>
                {/if}
            </label>
            <div class="flex flex-col gap-4 mt-4">
                <FormButton type="button" onClick={nextStage} primary>Siguiente</FormButton>
                <FormButton type="button" onClick={prevStage} secondary>Volver</FormButton>
            </div>
        {/if}
        {#if stage === 3}
            <label for="password" class="flex flex-col gap-1 relative">
                Contraseña:
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Tu contraseña" 
                    class="h-[48px] border-1 border-light-gray rounded-md px-2 placeholder:text-medium-gray shadow-xl mb-4"
                    bind:value={formData.password}
                    on:blur={() => validateField('password')}
                >
                {#if errors.password}
                    <span class="text-red-500 text-xs absolute bottom-0 left-0">{errors.password}</span>
                {/if}
            </label>
            <label for="confirmPassword" class="flex flex-col gap-1 relative">
                Confirmar contraseña:
                <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    placeholder="Confirma tu contraseña" 
                    class="h-[48px] border-1 border-light-gray rounded-md px-2 placeholder:text-medium-gray shadow-xl mb-4"
                    bind:value={formData.confirmPassword}
                    on:blur={() => validateField('confirmPassword')}
                >
                {#if errors.confirmPassword}
                    <span class="text-red-500 text-xs absolute bottom-0 left-0">{errors.confirmPassword}</span>
                {/if}
            </label>
            <div class="flex flex-col gap-4 mt-4">
                <FormButton type="submit" primary>Registrarse</FormButton>
                <FormButton type="button" onClick={prevStage} secondary>Volver</FormButton>
            </div>
        {/if}
    </form>
</main>