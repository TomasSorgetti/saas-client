<script>
    export let isSidebarOpen = false
    export let toggleSidebar = () => {};
</script>
<aside class={`fixed top-0 left-0 h-screen z-30 w-full bg-[#2D0D87] ${isSidebarOpen ? "max-w-[300px]": "max-w-[100px]"}`}>
    <div class="relative mt-32 hidden lg:block">
        <button onclick={toggleSidebar} class="absolute bottom-2 -right-14 bg-red-400">Toggle</button>
    </div>

    <nav class="mt-32 flex justify-center w-full text-white">
        <ul class="flex flex-col gap-4">
            <li class="flex gap-2 items-center">
                <img src="/icon.png" alt="icon">
                <a href="/private/dashboard" class={`${!isSidebarOpen && "hidden"}`}>Dashboard</a>
            </li>
            <li class="flex gap-2 items-center">
                <img src="/icon.png" alt="icon">
                <a href="/private/dashboard" class={`${!isSidebarOpen && "hidden"}`}>Inventario</a>
            </li>
            <li class="flex gap-2 items-center">
                <img src="/icon.png" alt="icon">
                <a href="/private/dashboard" class={`${!isSidebarOpen && "hidden"}`}>Pedidos y Producción</a>
            </li>
            <li class="flex gap-2 items-center">
                <img src="/icon.png" alt="icon">
                <a href="/private/dashboard" class={`${!isSidebarOpen && "hidden"}`}>Eventos</a>
            </li>
            <li class="flex gap-2 items-center">
                <img src="/icon.png" alt="icon">
                <a href="/private/dashboard" class={`${!isSidebarOpen && "hidden"}`}>Recetas</a>
            </li>
            <li class="flex gap-2 items-center">
                <img src="/icon.png" alt="icon">
                <a href="/private/dashboard" class={`${!isSidebarOpen && "hidden"}`}>Proveedores</a>
            </li>
            <li class="flex gap-2 items-center">
                <img src="/icon.png" alt="icon">
                <a href="/private/dashboard" class={`${!isSidebarOpen && "hidden"}`}>Delivery</a>
            </li>
            <li class="flex gap-2 items-center">
                <img src="/icon.png" alt="icon">
                <a href="/private/dashboard" class={`${!isSidebarOpen && "hidden"}`}>Fidelización</a>
            </li>
            <li class="flex gap-2 items-center">
                <img src="/icon.png" alt="icon">
                <a href="/private/dashboard" class={`${!isSidebarOpen && "hidden"}`}>Estrategias</a>
            </li>

        </ul>
    </nav>
</aside>