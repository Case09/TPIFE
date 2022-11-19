<script lang="ts">
	import config from '../../disk-drive/config';
	import { activeSceneText } from '../stores';
	import { tweened } from 'svelte/motion';

	//NOTE: Don't change indentations of <pre> tags or can mess up the scene text

	let typewriterStore = initStore();

	function initStore() {
		return tweened(0, {
			duration: config.typewriterSpeed,
			easing: config.typewriterEasingFn
		});
	}

	$: {
		typewriterStore = initStore();
		typewriterStore.set($activeSceneText.length);
	}
</script>

{#if $activeSceneText}
	{#if config.typewriterEffect}
		<pre class="scene">
<code>{@html $activeSceneText.substring(0, $typewriterStore)}</code>
</pre>
	{:else}
		<pre class="scene">
<code>{@html $activeSceneText}</code>
</pre>
	{/if}
{/if}

<style type="text/css">
	.scene {
		height: 100%;
		overflow: auto;
		white-space: pre-wrap;
		cursor: default;
	}
</style>
