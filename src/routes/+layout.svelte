<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="flex flex-1 flex-col items-center">
	{@render children()}
</main>
