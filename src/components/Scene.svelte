<script lang="ts">
	import config from '../../disk-drive/config';
	import { activeSceneText } from '../stores';
	import { tick } from 'svelte';

	//NOTE: Don't change indentations of <pre> tags or can mess up the scene text

	let visible = false;

	function typewriter(node, { speed = config.typewriterSpeed }) {
		const text = node.innerHTML;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t) => {
				const i = ~~(text.length * t);
				node.innerHTML = text.slice(0, i);
			}
		};
	}

	$: if ($activeSceneText) {
		visible = false;
		tick().then(() => {
			visible = true;
		});
	}
</script>

{#if $activeSceneText}
	{#if config.typewriterEffect}
		<pre class="scene">
{#if visible}
				<code in:typewriter>{@html $activeSceneText}</code>
			{/if}
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
