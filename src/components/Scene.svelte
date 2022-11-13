<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import config from '../../disk-drive/config';
	import { activeSceneText } from '../stores';
</script>

<pre class="scene">
  {#if $activeSceneText}
		{#if config.typewriterEffect}
			<Typewriter cursor={false} delay={100} interval={config.typewriterSpeed}>
        <span>{@html $activeSceneText}</span>
      </Typewriter>
		{:else}
			<span>{@html $activeSceneText}</span>
		{/if}
	{/if}
</pre>

<style type="text/css">
	.scene {
		height: 100%;
		overflow: auto;
		white-space: pre-wrap;
	}
</style>
