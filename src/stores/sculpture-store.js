import dispatcher from '../dispatcher';
import SculptureStore from 'anyware/lib/game-logic/sculpture-store';
import config from '../config';

export default new SculptureStore(dispatcher, config);
