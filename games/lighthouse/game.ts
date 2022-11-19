import {alreadyPerformed, changeItemState, changeScene, exhaustItem, hasItem, hasItemState, recordAction, setText, takeItem} from '../../src/stores/helpers';
import lexicon from '../../disk-drive/lexicon';
import config from '../../disk-drive/config';
import type { IAction, IGame, IScene } from '../../src/types';
import { underline } from '../../src/utils';
import entrance from './scenes/entrance';
import behindTheLighthouse from './scenes/behind-the-lighthouse';
import groundFloor from './scenes/ground-floor';

const lighthouse = <IGame>{
  scenes: <IScene[]>[
    entrance,
    behindTheLighthouse,
    groundFloor
  ],
  inventoryActions: [

  ]
}

export default lighthouse;