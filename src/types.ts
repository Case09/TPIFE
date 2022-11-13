// Config to for setting up basic game look
export interface IConfig {
  title: string;
  width: number;
  height: number;
  helpText: string;
  typewriterEffect?: boolean;
  typewriterSpeed?: number;
  theme: 'high-contrast' | 'halloween';
  inputPlaceholder?: string;
  gap?: number // Gap between elements,
  unknownActionText: string;
  emptyInventoryText?: string;
  loopSceneSoundtrack?: boolean;
  startingSceneId: string;
  showSceneNameAtTheTop?: boolean;
}

export interface ITheme {
  name: string;
  // Bg colors
  bgColor?: string; // Main page background color
  sceneBgColor?: string; // Scene rectangle background color
  controlsBgColor?: string; // Controls rectangle color
  // Border colors
  borderColor?: string;
  sceneBorderColor?: string;
  controlsBorderColor?: string;
  bgUrl?: string;
  borderThickness?: number;
  textColor?: string;
  controlsInputBorderColor?: string;
  controlsInputBgColor?: string;
}

export interface IGame {
  scenes: IScene[],
  inventoryActions: IAction[]
}

export interface IScene {
  id: string;
  name?: string;
  onLook: () => void,
  onEnter: () => void,
  actions: IAction[],
  soundFile?: string;
}

export interface IAction {
  id: string;
  keys: (string | string[][])[];
  onTrigger: () => void;
}

export interface IItem {
  id: string;
  states: string[];
}