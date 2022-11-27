<script lang="ts">
	import { reverse } from 'ramda';
	import type { IAction } from '../types';
	import game from '../../disk-drive';
	import config from '../../disk-drive/config';
	import { activeScene, activeSceneText, commandHistory } from '../stores';
	import lexicon from '../../disk-drive/lexicon';
	import { recordAction, setText, showInventoryText } from '../stores/helpers';
	import themes from '../themes';

	let inputValue: string;

	$: theme = themes.find((t) => t.name === config.theme) || themes[0];

	function handleKeyDown(e: KeyboardEvent) {
		if (!inputValue) return;
		if (e.key === 'Enter') {
			interpret();
		}
	}

	function interpret() {
		const trimmed = inputValue.trim();
		$commandHistory = [...$commandHistory, trimmed];
		// INV
		if (lexicon.inventory.includes(trimmed)) {
			showInventoryText();
			inputValue = '';
			return;
		}
		// HELP
		if (lexicon.help.includes(trimmed)) {
			$activeSceneText = config.helpText;
			inputValue = '';
			return;
		}
		// LOOK
		if (lexicon.look.includes(trimmed)) {
			if (!$activeScene.onLook) {
				throw new Error('You must provide onLook function to every scene.');
			}
			$activeScene.onLook();
			recordAction(`${$activeScene.id}-look`);
			inputValue = '';
			return;
		}
		// SAVE
		if (lexicon.saveGame.includes(trimmed)) {
			saveGame();
			inputValue = '';
			return;
		}
		// LOAD
		if (lexicon.loadGame.includes(trimmed)) {
			loadGame();
			inputValue = '';
			return;
		}

		let matchingAction;
		matchingAction = getMatchingAction($activeScene.actions);

		if (!matchingAction) {
			// Try to see if it's matching any inventory action
			matchingAction = getMatchingAction(game.inventoryActions);
		}

		if (matchingAction) {
			if (matchingAction.onTrigger) {
				matchingAction.onTrigger();
				recordAction(matchingAction.id);
			} else {
				throw new Error('You must provide onTrigger function to every action.');
			}
		} else {
			$activeSceneText = config.unknownActionText;
		}
		inputValue = '';
	}

	function getMatchingAction(actions: IAction[]) {
		if (!actions) {
			throw new Error('Please provide array of actions.');
		}
		const trimmed = inputValue.trim();
		//TODO make it better
		let matchingAction;
		for (const action of actions) {
			for (const key of action.keys) {
				const regexString = key
					.map((e) => e + '')
					.map((e) =>
						e
							.split(',')
							.map((n) => '\\b' + n + '\\b')
							.join('|')
					)
					.map((e, i, a) => {
						if (i === a.length - 1) {
							return `(${e})$`; //TODO check if it's safe to use '$' here
						} else {
							return `(${e}).*`;
						}
					})
					.join('');
				const regex = new RegExp(regexString, 'g');
				if (trimmed.toLowerCase().match(regex)) {
					matchingAction = action;
					break;
				}
			}
			if (matchingAction) {
				break;
			}
		}
		return matchingAction;
	}

	function saveGame() {
		localStorage.setItem(
			//TODO see if localStorage can have enough space
			config.title.toLowerCase(),
			$commandHistory
				.filter((c) => !lexicon.saveGame.includes(c) && !lexicon.loadGame.includes(c))
				.join('+')
		);
		setText('Game saved successfully');
	}

	function loadGame() {
		const game = localStorage.getItem(config.title.toLowerCase());
		if (!game) {
			setText('No save file found.');
		} else {
			const commands = game.split('+');
			//TODO improve, maybe add loader
			for (const command of commands) {
				inputValue = command;
				interpret();
			}
		}
	}

	$: inputStyle = [
		theme.controlsInputBorderColor &&
			`--controlsInputBorderColor: ${theme.controlsInputBorderColor}`,
		theme.controlsInputBgColor && `--controlsInputBgColor: ${theme.controlsInputBgColor}`
	]
		.filter(Boolean)
		.join(';');
</script>

<div class="controls">
	<input
		type="text"
		style={inputStyle}
		autofocus
		on:keydown={handleKeyDown}
		bind:value={inputValue}
		maxlength="100"
		placeholder={config.inputPlaceholder}
	/>
	<code class="history">
		{#each reverse($commandHistory) as h}
			<p>> {h}</p>
		{/each}
	</code>
</div>

<style type="text/css">
	.controls {
		display: flex;
		gap: var(--controlsPadding);
	}

	.controls input {
		border: var(--borderThickness) solid var(--controlsInputBorderColor);
		background-color: var(--controlsInputBgColor);
		color: var(--textColor);
		padding: 0.5rem;
		height: 20px;
		border-radius: 3px;
		outline: none;
	}

	.controls .history {
		flex: 1;
		border: var(--borderThickness) solid var(--controlsBorderColor);
		color: var(--textColor);
		padding: 1rem;
		height: 60px;
		line-height: 1.8;
		overflow-y: auto;
		overflow-x: hidden;
		white-space: pre-wrap;
	}
</style>
