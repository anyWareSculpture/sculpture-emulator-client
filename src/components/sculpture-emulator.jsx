/*eslint no-extra-parens:0*/
import React from 'react';

import TopNav from './top-nav';
import Handshake from './handshake';
import Status from './status';
import Warning from './warning';
import Lights from './lights';
import DiskGroup from './disk-group';
import DiskPositionForm from './disk-position-form';
import AppStoreCreator from '../stores/app-store';
import ActionCreator from '../actions/app-actions';
import AppDispatcher from '../dispatcher/app-dispatcher';

/**
 * @class SculptureEmulator
 * @extends React.Component
 * @public
 *
 * Top level view for the application.
 */
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
