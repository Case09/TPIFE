<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import config from '../../disk-drive/config';
	import { activeSceneText } from '../stores';
</script>

{#if $activeSceneText}
	{#if config.typewriterEffect}
		<Typewriter cursor={false} delay={100} interval={config.typewriterSpeed}>
			<pre class="scene">
<code>{@html $activeSceneText}</code>
</pre>
		</Typewriter>
	{:else}
		<pre>
			<code>{@html $activeSceneText}</code>
		</pre>
	{/if}
{/if}

<style type="text/css">
	.scene {
		height: 100%;
		overflow: auto;
		white-space: pre-wrap;
	}
</style>
