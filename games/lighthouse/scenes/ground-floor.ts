import lexicon from '../../../disk-drive/lexicon';
import { alreadyPerformed, changeScene, setText } from '../../../src/stores/helpers';
import type { IScene } from '../../../src/types';
import { underline } from '../../../src/utils';

export default <IScene>{
  id: 'ground-floor',
  onEnter: () => {
    setText('To be continued...');
  }, 
  onLook: () => {
    setText('To be continued...');
  },
  actions: []
}