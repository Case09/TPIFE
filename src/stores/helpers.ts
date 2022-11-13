import { actionHistory, activeScene, activeSceneText, inventory } from '.';
import game from '../../disk-drive';
import config from '../../disk-drive/config';
import type { IItem } from '../types';

export function setText(text: string) {
  activeSceneText.set(text);
}

export function changeScene(sceneId: string) {
  if (!sceneId) {
    throw new Error('Please provide sceneId when changing scenes');
  }
  const scene = game.scenes.find(s => s.id === sceneId);
  activeScene.set(scene);
  activeScene.subscribe(s => s.onEnter());
}

export function showHelpText() {
  activeSceneText.set(config.helpText);
}

export function showInventoryText() {
  let itemDescriptions: string[] = [];
  inventory.subscribe(i => {
    itemDescriptions = i.map(item => {
      return `${item.id} (${item.states.join(', ')})`;
    });
  });
  const text = itemDescriptions.length > 0 ? `Your inventory:

${itemDescriptions.join('\n')}
` 
  : config.emptyInventoryText;
  activeSceneText.set(text);
}

export function takeItem(item: IItem) {
  inventory.update(i => [...i, item]);
}

export function hasItem(itemId: string): boolean {
  let hasIt = false;
  inventory.subscribe(i => {
    hasIt = !!(i.find(item => item.id === itemId));
  });
  return hasIt;
}

export function hasItemState(itemId: string, state: string): boolean {
  let hasIt = false;
  inventory.subscribe(i => {
    const item = i.find(item => item.id === itemId);
    hasIt = item.states.includes(state);
  });
  return hasIt;
}

export function changeItemState(itemId: string, oldState: string, newState: string) {
  inventory.update(i => {
    const item = i.find(item => item.id === itemId);
    const changed = {...item, states: [...item.states.filter(s => s !== oldState), newState]};
    return [...i.filter(i => i.id !== itemId), changed];
  })
}

export function alreadyPerformed(actionId: string): boolean {
  let performed = false;
  actionHistory.subscribe(h => {
    performed = h.includes(actionId);
  });
  return performed;
}

export function recordAction(actionId: string) {
  actionHistory.update(h => [...h, actionId]);
}