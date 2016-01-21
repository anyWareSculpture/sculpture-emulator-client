/*eslint no-extra-parens:0*/
const React = require('react');
let TopNav = require('./top-nav');
let Handshake = require('./handshake');
let Status = require('./status');
let Warning = require('./warning');
let Lights = require('./lights');
let DiskGroup = require('./disk-group');
let DiskPositionForm = require('./disk-position-form');
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
    let warning, controls, disks;
    let client = this.state.client || {};
    let sculpture = this.state.sculpture;
    let appState = this.state.appState;
    let config = this.AppStore.config;

    if (!client.connected) {
      warning = <Warning msg="disconnect" />;
    }

    controls = <Lights appState={appState} sculpture={sculpture} />;
    disks = <DiskGroup sculpture={sculpture} />;
    let handshakelights = sculpture.data
      .get("lights")
      .get(config.LIGHTS.HANDSHAKE_STRIP);

      console.log(sculpture);

    return (
      <span className="sculpture-emulator">
        <TopNav
         currentGame={sculpture.data.get("currentGame")}
         isActive={false} />
        <div className="main-content" role="main">
          <div className="game-content">
            { warning }
            { controls }
            { disks }
            <DiskPositionForm />
          </div>
          <div className="sidebar-content">
            <div className="well">
              <Handshake
                handshakes={sculpture.data.get("handshakes")}
                lights={handshakelights}
                username={config.username} />
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
