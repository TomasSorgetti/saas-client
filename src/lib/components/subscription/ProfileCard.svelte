<script>
    export let label = "Suscripción";
    export let planName = "Free Tier";
    export let description = false;
</script>

<div class="bg-[linear-gradient(90deg,_var(--primary-color),_var(--secondary-color))] rounded-lg w-full flex justify-between items-center">
    <div class="flex flex-col items-start gap-6 justify-center p-10">
        <div class="flex flex-col items-start">
            <small class="uppercase text-xl text-white tracking-[0.6rem]">{label}</small>
            <span class="text-5xl text-white font-bold">Suscripción {planName}</span>
        </div>
        <p class="text-white max-w-[500px]">{description}</p>
        <a href="/private/account/plans" class="bg-white text-black rounded-md font-bold flex items-center gap-4 pr-14 text-[18px]">
            <img src="/star_button.svg" alt="star icon" class="h-full w-auto">
            Mejorar plan
        </a>
    </div>
    <img src="/subscripton_star.png" alt="subscripton star icon" class="h-full w-auto hidden lg:block" />
</div>