<script lang="ts">
	import { onMount } from 'svelte';
	import config from '../../disk-drive/config';
	import { activeScene, activeSceneText } from '../stores';
	import themes from '../themes';
	import Controls from './Controls.svelte';
	import Scene from './Scene.svelte';
	import game from '../../disk-drive';

	$: theme = themes.find((t) => t.name === config.theme) || themes[0];
	$: styles = [
		config.width && `--width: ${config.width}px`,
		config.height && `--height: ${config.height}px`,
		config.gap && `--gap: ${config.gap}px`,
		theme.textColor && `--textColor: ${theme.textColor}`,
		theme.borderThickness && `--borderThickness: ${theme.borderThickness}px`,
		theme.borderColor && `--borderColor: ${theme.borderColor}`,
		// scene
		theme.sceneBgColor && `--sceneBgColor: ${theme.sceneBgColor}`,
		theme.sceneBorderColor && `--sceneBorderColor: ${theme.sceneBorderColor}`,
		// controls
		theme.controlsBgColor && `--controlsBgColor: ${theme.controlsBgColor}`,
		theme.controlsBorderColor && `--controlsBorderColor: ${theme.controlsBorderColor}`,
		addScenePadding && `--scenePadding: ${config.gap}px`,
		addControlsPadding && `--controlsPadding: ${config.gap}px`
	]
		.filter(Boolean)
		.join(';');

	$: addScenePadding = theme.sceneBgColor || theme.sceneBorderColor;
	$: addControlsPadding = theme.controlsBgColor || theme.controlsBorderColor;

	onMount(() => {
		const startingScene =
			game.scenes.find((s) => s.id === config.startingSceneId) || game.scenes[0];
		startingScene.onEnter();
		$activeScene = startingScene;
	});
</script>

<div class="wrapper">
	<div class="game" style={styles}>
		{#if config.showSceneNameAtTheTop}
			<div class="name-on-top">
				{#if $activeScene?.name}
					{$activeScene.name}
				{/if}
			</div>
		{/if}
		<section class="scene-container">
			<Scene />
		</section>
		<section class="controls-container">
			<Controls />
		</section>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		overflow: auto;
	}

	.game {
		display: flex;
		flex-direction: column;
		width: var(--width);
		height: var(--height);
		border: var(--borderThickness) solid var(--borderColor);
		padding: var(--gap);
		color: var(--textColor);
		margin: 1rem;
		gap: var(--gap);
		overflow: auto;
	}

	.name-on-top {
		height: 15px;
		color: white;
		font-family: monospace;
	}

	.scene-container {
		flex: 3;
		padding: var(--scenePadding);
		background-color: var(--sceneBgColor);
		border: var(--borderThickness) solid var(--sceneBorderColor);
		overflow: auto;
	}

	.controls-container {
		flex: 1;
		padding: var(--controlsPadding);
		background-color: var(--controlsBgColor);
		border: var(--borderThickness) solid var(--controlsBorderColor);
	}
</style>
