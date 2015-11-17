/**
 * @fileOverview contains the applciation to store, to handle dispatched events,
 *               and maintain sculpture, application, and streaming client data.
 */
let AppDispatcher = require('../dispatcher/app-dispatcher');
let EventEmitter = require('events').EventEmitter;
let Actions = require('../constants/app-constants');
let PanelAnimations = require('../animations/panel-animations');

const StreamingClient = require('@anyware/streaming-client');
const SculptureStore = require('@anyware/game-logic/lib/sculpture-store');
const SculptureActionCreator = require('@anyware/game-logic/lib/actions/sculpture-action-creator');
const DefaultConfig = require('@anyware/game-logic/lib/config/default-config');

const DEFAULT_CLIENT_CONNECTION_OPTIONS = {
  username: "anyware",
  password: "anyware",
  host: "connect.shiftr.io"
};

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
    this._animating = false;

    AppDispatcher.register((action) => {
      this._log(`Sent action: ${JSON.stringify(action)}`);
      switch (action.actionType) {
        case Actions.APP_CLIENT_SETUP:
          this.connectAndSetupClient(action.loginOptions);
          break;

        case Actions.APP_LOGIN:
          this.connectAndSetupClient(action.loginOptions);
          break;

        case Actions.PLAY_SUCCESS_ANIM:
          this.playSuccessAnimation();
          break;
        case Actions.PLAY_FAIL_ANIM:
          this.playFailureAnimation();
          break;

        default:
          // nop
      }
    });

    this.config = new DefaultConfig();

    // Register callback to handle app Actions
    this.sculpture = new SculptureStore(AppDispatcher, this.config);
    this.sculpture.on(SculptureStore.EVENT_CHANGE, (changes) => {
      this._log(`Sent state update: ${JSON.stringify(changes)}`);
      this.client.sendStateUpdate(changes);
      this.emitChange();
    });
    this.sculptureActionCreator = new SculptureActionCreator(AppDispatcher);
  }

  /********* PUBLIC METHODS *********/

  /**
   * Determines if the sculpture needs to play a success animation based on its status.
   * @return {boolean} Returns true if a success animation is required,
   *                           false otherwise.
   */
  needsSuccessAnimation() {
    return this.sculpture.data.get("status")
      === SculptureStore.STATUS_SUCCESS
      && this._animating === false;
  }

  /**
   * Determines if the sculpture needs to play a failure animation based on its status.
   * @return {boolean} Returns true if a failure animation is required,
   *                           false otherwise.
   */
  needsFailureAnimation() {
    return this.sculpture.data.get("status")
      === SculptureStore.STATUS_FAILURE
      && this._animating === false;
  }

  /**
   * Triggers a success animation.
   */
  playSuccessAnimation() {
    this._log("Playing success animation...");
    this._animating = true;
    PanelAnimations.playSuccessAnimation(
      this.showAnimationFrame.bind(this),
      this.animationComplete.bind(this)
    );
  }

  /**
   * Triggers a failure animation.
   */
  playFailureAnimation() {
    this._log("Playing failure animation...");
    this._animating = true;
    PanelAnimations.playFailureAnimation(
      this.showAnimationFrame.bind(this),
      this.animationComplete.bind(this)
    );
  }

  /**
   * Callback when an animation is complete notifies scultpture of status change.
   */
  animationComplete() {
    this._log("Animation complete!");
    this._animating = false;
    this.sculptureActionCreator.sendFinishStatusAnimation();
  }

  /**
   * Handles showing the animation frame by updating the store and
   *   emitting a change, causing rerender.
   * @param  {Object} panels LightArray to define current frame.
   */
  showAnimationFrame(panels) {
    // update temp panels to show next frame in an animation
    this.animPanels = panels;
    this.emitChange();
  }

  /**
   * Getter for the sculpture store.
   * @return {Object} SculptureStore
   */
  getSculpture() {
    return this.sculpture;
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
   *                           isAnimating: {bool}
   *                           commandLog: {array} array of strings
   *                           animPanels: {LightArray} panels for use as
   *                                                    animation frame
   *                         }
   */
  getAppState() {
    return {
      isAnimating: this._animating,
      commandLog: this.commandLog,
      animPanels: this.animPanels
    };
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

  /********* PRIVATE METHODS ********/

  _onConnectionStatusChange() {
    this._log(`Client Connected: ${this.client.connected}`);
    this.emitChange();
  }

  /**
   * Adds message to the command log, maintaining a maximum history.
   * @param  {string} msg Mesage to add.
   */
  _log(msg) {
    this.commandLog.push(msg);

    if (this.commandLog.length > 100) {
      this.commandLog = _.takeRight(this.commandLog, 100);
    }
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
    update.metadata = metadata;
    this._log(`Got state update: ${JSON.stringify(update)}`);
    this.emitChange();

    this.sculptureActionCreator.sendMergeState(update);
  }
}
