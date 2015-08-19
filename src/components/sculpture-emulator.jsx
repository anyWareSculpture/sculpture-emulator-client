let TopNav = require('./top-nav');
let Handshake = require('./handshake');
let Status = require('./status');
let Warning = require('./warning');
let MoleGame = require('./mole-game');
let AppStoreCreator = require('../stores/app-store');
let ActionCreator = require('../actions/app-actions');

export default class SculptureEmulator extends React.Component {
  static displayName = 'SculptureEmulator';

  constructor(props) {
    super(props);
    this.AppStore = new AppStoreCreator();
    this.state = this.getStateFromStores();
    let actions = new ActionCreator();
    actions.connectAndSetupClient();
  }

  componentDidMount() {
    this.AppStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.AppStore.removeChangeListener(this._onChange.bind(this));
  }

  getStateFromStores() {
    return {
      sculpture: this.AppStore.getSculpture(),
      client: this.AppStore.getClient(),
      appState: this.AppStore.getAppState()
    };
  }

  _onChange() {
    console.log('State change captured.');
    this.setState(this.getStateFromStores);
  }

  render() {
    let warning, game;
    let client = this.state.client || {};
    let sculpture = this.state.sculpture;
    let appState = this.state.appState;

    if (!client.connected) {
      warning = <Warning msg="disconnect" />;
    }

    // if (sculpture.isPlayingMoleGame) {
    game = <MoleGame sculpture={sculpture} />;
    // }

    return (
      <span className="sculpture-emulator">
        <TopNav isActive={false} isLoggedIn={false} /> // need to determine if connection is read only or not
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
              <Status
                commandLog={ this.state.appState.commandLog }
                sculpture={sculpture} />
            </div>
          </div>
        </div>
      </span>
    );
  }
}
