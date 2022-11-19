## TPIFE (Text Parser Interactive Fiction "Engine")

![Screenshot](./screenshot.jpg?raw=true)
Small (unfinished) demo: https://tpife-hd0ajzm25-case09.vercel.app

## <u>Disclaimer</u>

I made this project primarily for myself and my IF writing, but i'm sharing it in hope someone else will find it useful as well.

This project is meant for people who want to write interactive fiction stories in javascript. It's not comprehensive as some other IF engines but you can definitely make something with it.

Currently this project is a bit rough around the edges, but i want to add more features to it, so there is still more to come.

---

## Table of contents

- [Running](#running)
- [Setting up a new story](#setup)
- [Text parsing](#parsing)
- [Configurations](#conf)
- [Helper functions](#helpers)
- [Soundtrack](#soundtrack)
- [Themes](#themes)
- [Acknowledgements](#ack)
- [Changelog](#changelog)

TPIFE is a framework for writing IF stories in Javascript. It is made with [SvelteKit](https://kit.svelte.dev/).

### Some features include:

- Simple, to the point UI
- Predefined themes for your game, ability to easily add your own
- When printing out text for your game, you can pass HTML elements which will also be rendered (for example you want to underline some words, or change their colour)
- Ability to add per scene audio files that will be played once player enters the scene
- Simple saving and loading of the game to localStorage (using "save game" or "load game" actions)
- Simple inventory system with ability to modify state of items in your inventory (for example turning on the flashlight)
- Ability to customise "typewriter" effect used to print out the text
- ...More to come!

## Running<a id="running"></a>

In order to run it locally do the following:

1. Get this repo
2. Run `npm install`
3. Run `npm run dev`
4. Open `localhost:5173`

To make a build version run `npm run build`

## Setting up a new story<a id="setup"></a>

Let's say you want to start writing new IF story called "TheStory" (i know, so original).

1. First off, start by making a new folder `/games` folder called `the-story` (or whatever you wish). So path would be `/games/the-story`
2. Inside your `the-story` folder, create two files, `game.ts` and `config.ts`. `game.ts` will house your game and `config.ts` the config for your game.
3. Your `/games/the-story/game.ts` can look like this:

```
import type { IAction, IGame, IScene } from '../../src/types';

const theStory = <IGame>{
  scenes: <IScene>[],
  inventoryActions: <IAction>[]
}

export default theStory;
```

4. Your `/games/the-story/config.ts` can look like this:

```
import type { IConfig } from '../../src/types';

const config: IConfig = {
  title: "The Story",
  width: 700,
  height: 500,
  typewriterSpeed: 1000,
  theme: 'black-and-beige',
  gap: 12,
  unknownActionText: 'Try something else.',
  helpText: `Directions:

sw n nw
w  +  e
sw s se

Example: to go somewhere type one of the following: "go s", "go south", "s", "south"

You are also able to look around with "look" command. You can also use shorthand "l" for looking around.
`,
}

export default config;
```

5. Next, in `/disk-drive`, open `config.ts` and change the following lines:

```
import ExampleGameConfig from '../games lighthouse/config';

export default <IConfig>mergeDeepRight(defaultConfig, ExampleGameConfig);

--INTO--

import TheStoryConfig from '../games/the-story/config';

export default <IConfig>mergeDeepRight(defaultConfig, TheStoryConfig);

```

6. Open `index.ts` in the same folder and change the following lines:

```
import Lighthouse from '../games/lighthouse game';

export default Lighthouse;

--INTO--

import TheStory from '../games/the-story/game';

export default TheStory;
```

With this, you've "inserted" your "TheStory" game and it will be shown when you run `npm run dev` or when you use build version.

You can repeat this process for any other games that you have in your `/games` folder and just export the one you want to "expose".

From now on, you can write all your game inside `/games/the-story/game.ts`.

<u>Please check `/games/lighthouse/game.ts` for and example called "lighthouse"</u>

## Text parsing<a id="parsing"></a>

Text parsing in TPIFE works based on a concept of `keys`. Key is a string that is used to connect user entered text with an action. You pass in `keys` as an array in your actions.

Example:

```
{
  ...
  keys: [
    ['enter', 'room', 'east']
    [lexicon.east],
    [lexicon.go, 'east']
  ],
  onTrigger: () => {}
  ...
}
```

Above example will recognise the action and run corresponding `onTrigger()` if user enters for example:

```
go to the east, go east, east, e, enter the room to the east, enter room in the east...
```

The important part is the order of words, so in order to trigger this action, user must enter "enter" before "room", so "room enter east" will not work.

This system is not very smart or complex but it works pretty well and it recognises more of a "natural" language.

## Configurations<a id="conf"></a>

Check out `/src/types.ts` for all types that are used.

Below are the properties you can use in your `/games/mygame/config.ts` file to add new or overwrite the default values.

| Propery name            | Default value                                    | Description                                                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                 | "Cool game"                                      | Title of your story, used as page title as well                                                                                                                                                                 |
| `width`                 | 700                                              | Width of you "game" window (value in pixels)                                                                                                                                                                    |
| `height`                | 500                                              | Height of your "game" window (value in pixels)                                                                                                                                                                  |
| `helpText`              | -                                                | Help text to be shown if user types "help". This is rendered in a <\pre> tag so you can pass the data formatted already (with new lines etc.). You can also pass HTML elements with style attribute for example |
| `typewriterEffect`      | true                                             | Turn on/off typewriter effect for the whole game                                                                                                                                                                |
| `typewriterEasingFn`    | quintInOut                                       | Easing function used for "typewriter" effect. If you want to change it pass it as an easing function from `svelte/easing`                                                                                       |
| `theme`                 | 'high-contrast'                                  | Theme of your game. Check out [themes](#themes) section for more info.                                                                                                                                          |
| `inputPlaceholder`      | 'What do you do?                                 | Placeholder for input field where user types in text.                                                                                                                                                           |
| `gap`                   | 16                                               | Gap between elements of your game screen                                                                                                                                                                        |
| `unknownActionText`     | 'Unknown action.'                                | When the user types in text that is not recognised as an action, this text is shown                                                                                                                             |
| `emptyInventoryText`    | 'Currently, you have nothing in your inventory.' | Text that is show when user types inventory command but has no item in their inventory                                                                                                                          |
| `loopSceneSoundtrack`   | true                                             | Loop all soundtrack files when they finish                                                                                                                                                                      |
| `showSceneNameAtTheTop` | true                                             | If you provide a `name` to your scene, it will be shown at the top of the game window, as long as that scene is active                                                                                          |
| `startingSceneId`       | -                                                | Pass a string and the game will run with that specific scene, otherwise first scene in `scenes[]` will be taken.                                                                                                |

## Helper functions<a id="helpers"></a>

Helper functions help you to easily invoke functions like switching scenes, taking items etc.

You can use them by importing them into your game file from `/src/stores/helpers.ts`

| Name                  | Params                                             | Return value | Description                                                                                                                           |
| --------------------- | -------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `setText()`           | text: string                                       | -            | Most important one. Prints out the text to the game screen. Use this whenever you need to show some text as a result of player action |
| `changeScene()`       | sceneId: string                                    | -            | By passing sceneId, player will be moved to a new scene and that scene's `onEnter()` will be run.                                     |
| `showHelpText()`      | -                                                  | -            | Prints out help text defined in the config                                                                                            |
| `showInventoryText()` | -                                                  | -            | Prints out inventory with list of items and their states                                                                              |
| `takeItem()`          | item: IItem                                        | -            | Puts item in the inventory                                                                                                            |
| `exaustItem()`        | itemId: string                                     | -            | Removes an item from the inventory                                                                                                    |
| `hasItemState()`      | itemId: string, state: string                      | boolean      | Returns boolean if user has item with a specific state.                                                                               |
| `hasItem()`           | itemId: string                                     | boolean      | Returns a boolean if user has a given item in their inventory                                                                         |
| `changeItemState()`   | itemId: string, oldState: string, newState: string | -            | Changes item state to a new one                                                                                                       |
| `alreadyPerformed()`  | actionId: string                                   | boolean      | Returns boolean about whether action is already performed                                                                             |
| `recordAction()`      | actionId: string                                   | -            | Records action for future reference                                                                                                   |

## Soundtrack<a id="soundtrack"></a>

Place any audio file supported by [audio tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) into `/static/sounds` directory. You can reference the files in this folder inside you scene by passing full file name to `soundFile`, e.g. `soundFile: 'light-rain.wav'`.

## Themes<a id="themes"></a>

Check out `/src/themes.ts` for all themes you can use. To use them, can pass theme `name` to your game config. If you want to make a new one, just copy and paste one of them and change the values.

It was intentionally made so that you cannot change everything, but with clever use of colors, you can push a certain "aesthetic".

## Acknowledgements<a id="ack"></a>

- Partly inspired by https://github.com/okaybenji/text-engine

## Changes<a id="changelog"></a>

TODO
