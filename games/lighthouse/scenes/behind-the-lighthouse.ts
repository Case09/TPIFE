import lexicon from '../../../disk-drive/lexicon';
import { setText } from '../../../src/stores/helpers';
import { underline } from '../../../src/utils';

export default {
  id: 'behind-lighthouse',
  name: 'Behind the lighthouse',
  onLook: () => {
    setText(`You see the ${underline('bird cages')} and a lot of feathers.`);
  },
  onEnter: () => {
    setText(`You walk past the rounded walls of the lighthouse, following the bird feathers.

The path leads to the lighthouse wall oposite of the lighthouse doors. You see a pile of ${underline('bird cages')}, stacked one on top of the other.

Besides that you see nothing interesting here, just a lot of mossy, wet rocks.
`)
  },
  actions: [
    {
      id: 'behind-lighthouse-examine-cages',
      keys: [
        [lexicon.look, 'cages'],
        [lexicon.look, 'bird', 'cages'],
        [lexicon.look, 'bird', 'cage'],
        [lexicon.look, 'cage'],
      ],
      onTrigger: () => {
        setText(`You look at the cages. They are all open, with no birds inside, but you can see a lot of bird feathers strewn all over the place.

You instinctivly think that those are pigeon feathers, even though your knowledge of birds is somewhat limited.
`)
      }
    },
    {
      id: 'behind-lighthouse-take-feather',
      keys: [
        [lexicon.take, 'feather'],
        [lexicon.take, 'feathers']
      ],
      onTrigger: () => {
        setText(`You see no reason why you would want to pick up some feathers.`);
      }
    }
  ]
}