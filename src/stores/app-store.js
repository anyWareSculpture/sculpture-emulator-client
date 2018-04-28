/**
 * @fileOverview contains the applciation to store, to handle dispatched events,
 *               and maintain sculpture, application, and streaming client data.
 */
import {EventEmitter} from 'events';
import _ from 'lodash';
import StreamingClient from 'anyware/lib/streaming-client';
import SculptureStore from 'anyware/lib/game-logic/sculpture-store';
import SculptureActionCreator from 'anyware/lib/game-logic/actions/sculpture-action-creator';
import AudioView from 'anyware/lib/views/audio-view';

import dispatcher from '../dispatcher';
import Actions from '../constants/app-constants';
import config from '../config';

import sculptureStore from './sculpture-store';

export default class AppStore extends EventEmitter {
  static CHANGE_EVENT = 'change';

  /**
   * Initializes values, registers actions to the dispatcher, and registers
   * callbacks to handle scultpture store actions.
   * @constructor
   */
  constructor() {
    super();
    this.client = null;
    this.commandLog = [];

    dispatcher.register((action) => {
//      this._log(`Sent action: ${JSON.stringify(action)}`);
      switch (action.actionType) {
      case Actions.APP_CLIENT_SETUP:
        this.connectAndSetupClient(action.loginOptions);
        break;

      case Actions.APP_LOGIN:
        this.connectAndSetupClient(action.loginOptions);
        break;

      default:
          // nop
      }
    });

    // Register callback to handle app Actions
    sculptureStore.on(SculptureStore.EVENT_CHANGE, (changes, metadata) => {
      this.emitChange();
      setTimeout(() => {
        this.client.sendStateUpdate(changes, metadata);
        this._debug(`Sent state update: ${JSON.stringify(changes)}`);
      }, 0);
    });
    this.sculptureActionCreator = new SculptureActionCreator(dispatcher);

    this.audioInitialized = false;
    this.audioView = new AudioView(sculptureStore, config, dispatcher);
    this.audioView.load(err => {
      if (err) {
         return console.log(`AudioView error: ${err}`);
      }
      this.audioInitialized = true;
      console.log('Loaded sounds');
    });
  }

  /********* PUBLIC METHODS *********/

  /**
   * Getter for the sculpture store.
   * @return {Object} SculptureStore
   */
  getSculpture() {
    return sculptureStore;
  }

  /**
   * Getter for the streaming client.
   * @return {Object} StreamingClient
   */
  getClient() {
    return this.client;
  }

  /**
   * Determines which data within the store is state data.
   * @return {Object} Object contains properties within the store that are
   *                         important to the emulator.
   *                         {
   *                           commandLog: {array} array of strings
   *                         }
   */
  getAppState() {
    return {
      commandLog: this.commandLog,
    };
  }

  emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  /**
   * Creates and connects to the StreamingClient.
   * @param  {Object} options credentials for login
   *                          {
   *                            username: {string}
   *                            password: {string}
   *                            host: {string}
   *                          }
   */
  connectAndSetupClient(options) {
    options = _.defaults({}, options, config.CLIENT_CONNECTION_OPTIONS);

    if (this.client) {
      console.log('Closing existing client connection.');
      this.client.close();
    }

    this._log("Streaming client: Connecting using username " + options.username);

    this.client = new StreamingClient(options);
    this.client.on(StreamingClient.EVENT_CONNECT, this._onConnectionStatusChange.bind(this));
    this.client.on(StreamingClient.EVENT_DISCONNECT, this._onConnectionStatusChange.bind(this));

    this.client.on(StreamingClient.EVENT_ERROR, this._error.bind(this));

    this.client.on(StreamingClient.EVENT_STATE_UPDATE, this._onStateUpdate.bind(this));
  }

  /********* PRIVATE METHODS ********/

  _onConnectionStatusChange() {
    this._log(`Client Connected: ${this.client.connected}`);
    if (this.client.connected) {
      this.sculptureActionCreator.sendLogin(this.client.username);
    }
    this.emitChange();
  }

  /**
   * Adds message to the command log, maintaining a maximum history.
   * @param  {string} msg Mesage to add.
   */
  _log(msg) {
    console.log(msg);
/*
    this.commandLog.push(msg);

    if (this.commandLog.length > 100) {
      this.commandLog = _.takeRight(this.commandLog, 100);
    }
*/
  }

  _debug(msg) {
    if (config.DEBUG.console) console.debug(msg);
  }

  /**
   * Outputs error message to the console.
   * @param  {Object} error contains the error data
   */
  _error(error) {
    const errorMessage = error.stack || error.message || error;
    console.error(errorMessage);
  }

  /**
   * Handles state updates from the StreamingClient.
   * Logs it, bubbles change event up to emulator, and merges the state.
   * @param  {Object} update to be merged.
   * @param  {Object} metadata to add to the update.
   */
  _onStateUpdate(update, metadata) {
    // Ignore our own state update. FIXME: Can this be configured with MQTT instead?
    if (metadata.from === sculptureStore.me) return;

    update.metadata = metadata;
    this._debug(`Got state update: ${JSON.stringify(update)}`);
    this.emitChange();

    this.sculptureActionCreator.sendMergeState(update);
  }

}
