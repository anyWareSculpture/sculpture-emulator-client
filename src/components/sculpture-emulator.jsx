// const StreamingClient = require('@anyware/streaming-client');
// DOESN'T WORK!! -- this gives the error with index at 1

// const CLIENT_CONNECTION_OPTIONS = {
//   protocol: "ws",
//   username: "anyware",
//   password: "anyware",
//   host: "connect.shiftr.io:1884"
// };

let TopNav = require('./top-nav');
let Handshake = require('./handshake');
let Status = require('./status');
let Warning = require('./warning');
let MoleGame = require('./mole-game');

class SculptureEmulator extends React.Component {
  static displayName = 'SculptureEmulator';
  render() {
    let warning, game;
    if (!this.props.isConnected) {
      warning = <Warning msg="disconnect" />;
    }

    if (this.props.game === "mole") {
      game = <MoleGame />;
    }

    return ( <span className="sculpture-emulator">
        <TopNav isActive={false} isLoggedIn={false} />
        <div className="main-content" role="main">
          <div className="game-content">
            { warning }
            { game }
          </div>
          <div className="sidebar-content">
            <div className="well">
              <Handshake isSending={true} />
            </div>
            <div className="well">
              <Status />
            </div>
          </div>
        </div>
      </span>
    );
  }
}

// const client = new StreamingClient(CLIENT_CONNECTION_OPTIONS);

// window.clientConnected = client.connected;

// const updateConnectionStatus = () => {
//   window.clientConnected = client.connected;
// };
// client.on(StreamingClient.EVENT_CONNECT, updateConnectionStatus);
// client.on(StreamingClient.EVENT_DISCONNECT, updateConnectionStatus);

// client.on(StreamingClient.EVENT_ERROR, (error) => {
//   console.error(error);
// });

// let loginComplete = () => {
//   window.isLoggedIn = true;
//   window.showStatus = true;
// };

// Note: pass isConnected as property for now, until connecting to streaming server is implemented.
$(document).ready(() => {
  React.render(<SculptureEmulator isConnected={true} game="mole" />, document.getElementById('container'));
});
