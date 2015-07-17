let TopNav = require('./top-nav');
let Handshake = require('./handshake');
let Status = require('./status');
let Warning = require('./warning');
let MoleGame = require('./mole-game');

class SculptureEmulator extends React.Component {
  static displayName = 'SculptureEmulator';
  static propTypes = {
    game: React.PropTypes.string,
    isConnected: React.PropTypes.bool
  }
  render() {
    let warning, game;
    if (!this.props.isConnected) {
      warning = <Warning msg="disconnect" />;
    }

    if (this.props.game === "mole") {
      game = <MoleGame />;
    }

    return (
      <span className="sculpture-emulator">
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

module.exports = SculptureEmulator;
