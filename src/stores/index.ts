import { writable } from 'svelte/store';
import type { IItem, IScene } from '../types';

export const activeScene = writable(<IScene>null);
export const activeSceneText = writable(<string>'');
export const actionHistory = writable(<string[]>[]);
export const commandHistory = writable(<string>[]);
export const inventory = writable(<IItem[]>[]);