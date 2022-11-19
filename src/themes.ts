import type { ITheme } from './types';

const themes = <ITheme[]>[
  {
    "name": "high-contrast",
    "bgColor": "black",
    "borderColor": "#37ff14",
    "borderThickness": 1,
    "controlsBorderColor": "#37ff14",
    "sceneBorderColor": "#37ff14",
    "textColor": "white",
    "controlsInputBgColor": "none",
    "controlsInputBorderColor": "#37ff14"
  },
  {
    "name": "halloween",
    "bgColor": "black",
    "borderColor": "orange",
    "borderThickness": 3,
    "controlsBorderColor": "orange",
    "sceneBorderColor": "orange",
    "textColor": "white",
    "controlsInputBgColor": "none",
    "controlsInputBorderColor": "orange"
  },
  {
    "name": "black-and-white",
    "bgColor": "black",
    "borderColor": "white",
    "borderThickness": 3,
    "controlsBorderColor": "white",
    "sceneBorderColor": "white",
    "textColor": "white",
    "controlsInputBgColor": "none",
    "controlsInputBorderColor": "white"
  }
];

export default themes;