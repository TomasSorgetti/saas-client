<script>
	import Navbar from "$lib/components/navigation/Navbar.svelte";

</script>

<Navbar />
<main class="min-h-screen w-screen text-landing-primary-text bg-[url('/landing-bg.png')]">
    <section class="h-screen flex items-center relative">
        <div class="container mx-auto w-full flex flex-col items-start gap-8">
            <h1 class="font-bold text-7xl max-w-[645px]">Power Your Bakery with Smart Solutions</h1>
            <p class="max-w-[500px]">Streamline inventory, predict demand, and boost sales with AI. Manage orders, events, and recipes effortlessly in one simple platform.</p>
            <a href="/auth/register" class="bg-[linear-gradient(90deg,_var(--primary-color),_var(--secondary-color))] text-white py-3 px-12 font-bold rounded">Start Your Free Trial</a>
        </div>
        <img src="/banner.png" alt="rise ai app" draggable="false" loading="eager" class="absolute right-0">
    </section>
    <section class="container mx-auto mt-32">
        <img src="/why.png" alt="rise ai app" draggable="false" loading="eager" class="w-full">

    </section>
</main>