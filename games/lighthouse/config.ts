import type { IConfig } from '../../src/types';

const config: IConfig = {
  title: "Lighthouse",
  width: 700,
  height: 500,
  theme: 'black-and-beige',
  gap: 12,
  unknownActionText: 'Try something else.',
  helpText: 
`Directions:

sw n nw
w  +  e
sw s se

Example: to go somewhere type one of the following: "go s", "go south", "s", "south"

You are also able to look around with "look" command. You can also use shorthand "l" for looking around.
`,
}

export default config;