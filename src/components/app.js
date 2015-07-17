require("babel/polyfill");
let SculptureEmulator = require('./sculpture-emulator');
const StreamingClient = require('@anyware/streaming-client');

const DEFAULT_CLIENT_CONNECTION_OPTIONS = {
  username: "anyware",
  password: "anyware",
  host: "connect.shiftr.io"
};

export class EmulatorApp {

  constructor() {
    this.client = null;

  }

  render() {
    React.render(
      <SculptureEmulator game="mole" isConnected={this.client.connected}/>,
      document.getElementById('container')
    );
  }

  connectAndSetup(options) {
    options = _.defaults({}, options, DEFAULT_CLIENT_CONNECTION_OPTIONS);

    if(this.client) {
      this.client.close();
    }

    this._log("Connecting using username " + options.username);

    this.client = new StreamingClient(options);
    this.client.on(StreamingClient.EVENT_CONNECT, this._onConnectionStatusChange.bind(this));
    this.client.on(StreamingClient.EVENT_DISCONNECT, this._onConnectionStatusChange.bind(this));

    this.client.on(StreamingClient.EVENT_ERROR, this._error.bind(this));

    this.client.on(StreamingClient.EVENT_STATE_UPDATE, this._onStateUpdate.bind(this));
  }

  _onConnectionStatusChange() {
    this._log(`Client Connected: ${this.client.connected}`);
    this.render();
  }

  _log(msg) {
    console.log(msg);
  }

  _error(error) {
    const errorMessage = error.stack || error.message || error;
    console.error(errorMessage);
  }

$(document).ready(() => {
  let emulator_app = new EmulatorApp();
  emulator_app.connectAndSetup();
  emulator_app.render();
});
