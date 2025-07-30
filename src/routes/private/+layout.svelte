<script>
	import Appbar from "$lib/components/navigation/Appbar.svelte";
	import Sidebar from "$lib/components/navigation/Sidebar.svelte";
</script>

<Appbar/>
<div class="flex h-full min-h-screen">
	<Sidebar/>
	<slot />
</div>