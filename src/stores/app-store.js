let AppDispatcher = require('../dispatcher/app-dispatcher');
let EventEmitter = require('events').EventEmitter;
let Actions = require('../constants/app-constants');

const StreamingClient = require('@anyware/streaming-client');
const {SculptureStore, SculptureActionCreator} = require('@anyware/game-logic');

const DEFAULT_CLIENT_CONNECTION_OPTIONS = {
  username: "anyware",
  password: "anyware",
  host: "connect.shiftr.io"
};

export default class AppStore extends EventEmitter {
  static CHANGE_EVENT = 'change';

  constructor() {
    super();
    this.client = null;

    AppDispatcher.register((action) => {
      this._log(`Sent action: ${JSON.stringify(action)}`);
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
    this.sculpture = new SculptureStore(AppDispatcher);
    this.sculpture.on(SculptureStore.EVENT_CHANGE, (changes) => {
      this._log(`Sent state update: ${JSON.stringify(changes)}`);
      this.client.sendStateUpdate(changes);
    });
    this.sculptureActionCreator = new SculptureActionCreator(AppDispatcher);
  }

  getSculpture() {
    return this.sculpture;
  }

  getClient() {
    return this.client;
  }

  getAppState() {
    return {};
  }

  emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListender(this.CHANGE_EVENT, callback);
  }

  connectAndSetupClient(options) {
    options = _.defaults({}, options, DEFAULT_CLIENT_CONNECTION_OPTIONS);

    if (this.client) {
      console.log('Closing existing client connection.');
      this.client.close();
    }

    this._log("Connecting using username " + options.username);

    this.client = new StreamingClient(options);
    this.client.on(StreamingClient.EVENT_CONNECT, this._onConnectionStatusChange.bind(this));
    this.client.on(StreamingClient.EVENT_DISCONNECT, this._onConnectionStatusChange.bind(this));

    this.client.on(StreamingClient.EVENT_ERROR, this._error.bind(this));

    this.client.once(StreamingClient.EVENT_CONNECT, () => {
      // Temporarily here until the full game transitions are implemented
      if (!this.sculpture.isPlayingMoleGame) {
        this._log("Starting mole game...");
        this.sculptureActionCreator.sendStartMoleGame();
      }
    });

    this.client.on(StreamingClient.EVENT_STATE_UPDATE, this._onStateUpdate.bind(this));
  }

  _onConnectionStatusChange() {
    this._log(`Client Connected: ${this.client.connected}`);
    this.emitChange();
  }

  _log(msg) {
    console.log(msg);
  }

  _error(error) {
    const errorMessage = error.stack || error.message || error;
    console.error(errorMessage);
  }

  _onStateUpdate(update, metadata) {
    update.metadata = metadata;

    this._log(`Got state update: ${JSON.stringify(update)}`);
    this.emitChange();

    this.sculptureActionCreator.sendMergeState(update);
  }
}
