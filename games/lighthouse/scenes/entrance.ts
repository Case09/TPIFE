import lexicon from '../../../disk-drive/lexicon';
import { alreadyPerformed, changeScene, setText } from '../../../src/stores/helpers';
import type { IScene } from '../../../src/types';
import { underline } from '../../../src/utils';

export default <IScene>{
  id: 'entrance',
  name: 'In front of the lighthouse',
  soundFile: 'light-rain.wav',
  onEnter: () => {
    if (alreadyPerformed('entrance-east')) {
      setText(`You return to the front door.`);
    } else {
    setText(`Sea water for a nearby wave splashes over your face as you make your way to the lighthouse. Behind you, you hear a farewell honk coming from a small boat that brought you here.

You're supposed to take over the ${underline('lighthouse')} keeper duties from a man named John Kuhlman, who currently resides in the lighthouse. You make your way up a small hill on which the lighthouse proudly stands.

It's late afternoon and the sea is restless...

As you climb the hill, you find yourself right in from of the lighthouse. The door is old but sturdy, weathered over the years by strong winds and salt water.
`);
    }
  },
  onLook: () => {
    setText(`In front of you are the ${underline('lighthouse')} doors. Next to the door you can see old lantern swinging in the wind.

You can see a trail of what looks like bird feathers leading to the back of the lighthouse to the east.
`)
  },
  actions: [
    {
      id: 'entrance-examine-lighthouse',
      keys: [
        [lexicon.look, 'lighthouse']
      ],
      onTrigger: () => {
        setText(`Lighthouse is off white in color and in some places, as the paint peeled off, you can see deep red colour of bricks.

As you tilt your head upwards, you see a series of windows in a vertical line, around 4 meters between each window. Sturdy wooden shutters are placed over the windows, and all of them are closed, presumably because of the strong winds.
`)
      }
    },
    {
      id: 'entrance-east',
      keys: [
        [lexicon.follow, 'trail'],
        [lexicon.follow, 'trail', 'of', 'feathers'],
        [lexicon.east],
        [lexicon.go, lexicon.east]
      ],
      onTrigger: () => {
        changeScene('behind-lighthouse');
      }
    },
    {
      id: 'entrance-knock',
      keys: [
        ['knock'],
        ['knock', 'on', 'door']
      ],
      onTrigger: () => {
        setText(`You knock on the door. After that you wait for a couple of seconds expecting that John will open the doors, but nothing happens.`)
      }
    },
    {
      id: 'entrance-open',
      keys: [
        ['enter', 'lighthouse'],
        [lexicon.open, 'door']
      ],
      onTrigger: () => {
        if (!alreadyPerformed('entrance-knock')) {
          setText('It is polite to knock first...');
        } else {
          changeScene('ground-floor');
        }
      }
    }
  ]
}