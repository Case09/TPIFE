<script>
	import config from '../../disk-drive/config';
	import { activeScene } from '../stores';
</script>

{#if $activeScene?.soundFile}
	<audio loop={config.loopSceneSoundtrack} autoplay src="/sounds/{$activeScene.soundFile}" />
{/if}
