import type { IConfig } from '../../src/types';

const config: IConfig = {
  title: "A regular night in a rainly city",
  startingSceneId: 'living-room',
  width: 700,
  height: 500,
  typewriterSpeed: 2,
  theme: 'halloween',
  gap: 15,
  unknownActionText: 'Try something else.',
  helpText: 
`Directions:

sw n nw
w  +  e
sw s se

to go somewhere type, for example "go sw" or just "sw"
`,
}

export default config;