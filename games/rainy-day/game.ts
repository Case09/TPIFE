import {alreadyPerformed, changeItemState, changeScene, hasItem, hasItemState, recordAction, setText, takeItem} from '../../src/stores/helpers';
import lexicon from '../../disk-drive/lexicon';
import config from '../../disk-drive/config';
import type { IGame, IScene } from '../../src/types';

const rainyDay = <IGame>{
  scenes:<IScene[]>[
    {
      id: 'living-room',
      actions: [
        {
          id: 'mirror-look',
          keys: [[lexicon.look, 'mirror']],
          onTrigger: () => {
            setText('Mirror looks dirty.');
          },
        },
        {
          id: 'mirror-break',
          keys: [[lexicon.break, 'mirror']],
          onTrigger: () => {
            if (alreadyPerformed('use-hammer-on-mirror')) {
              setText('It\'s already broken mate.');
            } else {
              setText('With what?');
            }
          }
        },
        {
          id: 'kitchen-north',
          keys: [[lexicon.go, 'kitchen'], [lexicon.north]],
          onTrigger: () => {
            changeScene('kitchen');
          }
        },
        {
          id: 'use-hammer-on-mirror',
          keys: [
            [lexicon.break, 'mirror', 'with', 'hammer'], 
            [lexicon.use, ['hammer', 'sickle'], 'mirror'],
            [lexicon.attack, 'mirror', 'with', ['hammer', 'sickle']]
          ],
          onTrigger: () => {
            setText('You broke the mirror with your hammer');
          }
        }
      ],
      onLook: () => {
        recordAction('living-room-look');
        setText('You see a mirror.');
      },
      onEnter: () => {
        setText('hello');
      },
    },
    {
      id: 'kitchen',
      onEnter: () => {
        setText(
          `
          You're in the kitchen.

          You see a lantern on the floor.
          `
        );
      },
      onLook: () => {
        recordAction('kitchen-look');
        setText('It\'s hella dirty. Lantern lies on the floor');
      },
      actions: [
        {
          id: 'take-lantern',
          keys: [
            [lexicon.take, 'lantern']
          ],
          onTrigger: () => {
            if (alreadyPerformed('take-lantern')) {
              setText(config.unknownActionText);
            } else {
              setText('You picked up the lantern.');
              takeItem({
                id: 'lantern',
                states: ['off', 'dirty'],
              });
            }
          }
        },
        {
          id: 'go-hallway',
          keys: [
            [lexicon.go, 'hallway'],
            [lexicon.east]
          ],
          onTrigger: () => {
            changeScene('hallway');
          }
        }
      ]
    },
    {
      id: 'hallway',
      onEnter: () => {
        setText('Hallway is long and dark.');
      },
      onLook: () => {
        recordAction('hallway-look');
        if (alreadyPerformed('turn-on-lantern')) {
          setText('With the light of your lantern, you see door at the end of the hallway');
        } else {
          setText('You can\'t see much in the dark');
        }
      },
      actions: [
      ]
    }
  ],
  inventoryActions: [
    {
      id: 'turn-on-lantern',
      keys: [
        [lexicon.activate, 'lantern']
      ],
      onTrigger: () => {
        if (hasItem('lantern')) {
          if (hasItemState('lantern', 'off')) {
            setText('You turn on the lantern');
            changeItemState('lantern', 'off', 'on');
          }
        } else {
          setText(config.unknownActionText);
        }
      }
    }
  ]
}

export default rainyDay;