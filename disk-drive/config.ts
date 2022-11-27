import {mergeDeepRight} from 'ramda';
import type { IConfig } from '../src/types';

/**
 * This file merges default config with game specific config and exports it as one for game engine to consume
 * 
 * import a config file for your game in this file like:
 * 
 * import MyGameConfig from '../games/mygame/config';
 * 
 * and change line below to:
 * 
 * export default <IConfig>mergeDeepRight(defaultConfig, MyGameConfig);
 * 
 */

const defaultConfig: IConfig = {
  title: "Cool game",
  width: 700,
  height: 500,
  typewriterEffect: true,
  typewriterSpeed: 30,
  theme: 'high-contrast',
  inputPlaceholder: 'What do you do?',
  gap: 16,
  unknownActionText: 'Unknown action.',
  emptyInventoryText: 'Currently, you have nothing in your inventory.',
  loopSceneSoundtrack: true,
  showSceneNameAtTheTop: true,
  helpText: 'Edit me',
  startingSceneId: 'Edit me'
}

import ExampleGameConfig from '../games/lighthouse/config';
export default <IConfig>mergeDeepRight(defaultConfig, ExampleGameConfig);
