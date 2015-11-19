/*eslint no-extra-parens:0*/
const React = require('react');
let TopNav = require('./top-nav');
let Handshake = require('./handshake');
let Status = require('./status');
let Warning = require('./warning');
let Lights = require('./lights');
let AppStoreCreator = require('../stores/app-store');
let ActionCreator = require('../actions/app-actions');

export default class SculptureEmulator extends React.Component {
  static displayName = 'SculptureEmulator';

  constructor(props) {
    super(props);
    this.AppStore = new AppStoreCreator();
    this.state = this.getStateFromStores();
    this.actions = new ActionCreator();
    this.actions.connectAndSetupClient();
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
    let warning, controls;
    let client = this.state.client || {};
    let sculpture = this.state.sculpture;
    let appState = this.state.appState;
    let config = this.AppStore.config;

    if (!client.connected) {
      warning = <Warning msg="disconnect" />;
    }

    controls = <Lights appState={appState} sculpture={sculpture} />;

    return (
      <span className="sculpture-emulator">
        <TopNav isActive={false} isLoggedIn={false} /> // need to determine if connection is read only or not
        <div className="main-content" role="main">
          <div className="game-content">
            { warning }
            { controls }
          </div>
          <div className="sidebar-content">
            <div className="well">
              <Handshake username={config.username} status={[sculpture.data.get('handshakes').get(config.user0), sculpture.data.get('handshakes').get(config.user1), sculpture.data.get('handshakes').get(config.user2)]} />
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
