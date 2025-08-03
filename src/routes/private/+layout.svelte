<script>
	import Appbar from "$lib/components/navigation/Appbar.svelte";
	import Sidebar from "$lib/components/navigation/Sidebar.svelte";

	let isSidebarOpen = false;

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}
</script>

<Appbar/>
<Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
<main class={`container mx-auto mt-32 w-full min-h-screen px-16 flex flex-col items-start ${isSidebarOpen && " ml-[300px]"}`}>
	<slot />
</main>