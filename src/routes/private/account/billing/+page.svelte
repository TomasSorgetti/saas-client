<script>

</script>

<main class="w-full min-h-screen mt-32 pl-16 flex flex-col items-start">
    <h1 class="text-5xl font-bold">Selecciona el plan</h1>
    <div class="w-full  max-w-[700px]">
        <ul class="mt-16 flex flex-col gap-8 items-start w-full">
            <!-- Free Tier plan -->
            <li class="flex items-stretch justify-start gap-6 w-full">
                <div class="flex items-start justify-start">
                    <input type="checkbox" class="mt-2">
                </div>

                <div class="flex flex-col items-start gap-3 w-full">
                    <div class="flex items-end gap-4">
                        <h2 class="font-bold flex gap-4 text-2xl">Free Tier plan</h2>
                        <span>Plan actual</span>
                    </div>
                    <p class="max-w-[400px]">Streamline inventory, predict demand, and boost sales with AI. Manage orders, events, and recipes effortlessly in one simple platform.</p>
                </div> 

                <div class="flex items-center justify-end font-bold min-w-[100px]">
                    <p>Gratis</p>
                </div>          
            </li>
            <!-- Simple plan -->
            <li class="flex items-stretch justify-start gap-6 w-full">
                <div class="flex items-start justify-start">
                    <input type="checkbox" class="mt-2">
                </div>

                <div class="flex flex-col items-start gap-3 w-full">
                    <div class="flex items-end gap-4">
                        <h2 class="font-bold flex gap-4 text-2xl">Simple plan</h2>
                    </div>
                    <p class="max-w-[400px]">Streamline inventory, predict demand, and boost sales with AI. Manage orders, events, and recipes effortlessly in one simple platform.</p>
                </div> 

                <div class="flex items-center justify-end font-bold min-w-[100px]">
                    <p>US$ 19.99</p>
                </div>          
            </li>
            <!-- Premium plan -->
            <li class="flex items-stretch justify-start gap-6 w-full">
                <div class="flex items-start justify-start">
                    <input type="checkbox" class="mt-2">
                </div>

                <div class="flex flex-col items-start gap-3 w-full">
                    <div class="flex items-end gap-4">
                        <h2 class="font-bold flex gap-4 text-2xl">Premium plan</h2>
                    </div>
                    <p class="max-w-[400px]">Streamline inventory, predict demand, and boost sales with AI. Manage orders, events, and recipes effortlessly in one simple platform.</p>
                </div> 

                <div class="flex items-center justify-end font-bold min-w-[100px]">
                    <p>US$ 39.99</p>
                </div>          
            </li>
        </ul>
        <div class="w-full flex items-center justify-end gap-12 mt-12">
            <p>Plan seleccionado: <span class="font-bold">Premium Plan</span></p>
            <button class="bg-[linear-gradient(90deg,_var(--primary-color),_var(--secondary-color))] text-white py-3 px-6 font-bold rounded cursor-pointer">Siguiente</button>
        </div>
    </div>
</main>
