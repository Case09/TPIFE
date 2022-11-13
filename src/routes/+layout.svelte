<script lang="ts">
	import config from '../../disk-drive/config';
	import themes from '../themes';

	$: theme = themes.find((t) => t.name === config.theme) || themes[0];
	$: styles = `background-color: ${theme.bgColor}`;
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div style={styles}>
	<slot />
</div>

<style>
	:global(body, p, pre) {
		padding: 0;
		margin: 0;
	}
</style>
