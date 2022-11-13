<script lang="ts">
	import Soundtrack from '../components/Soundtrack.svelte';
	import Game from '../components/Game.svelte';
</script>

<div class="container">
	<Soundtrack />
	<Game />
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
