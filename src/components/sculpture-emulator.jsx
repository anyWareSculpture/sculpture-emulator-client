/*eslint no-extra-parens:0*/
import React from 'react';

import TopNav from './top-nav';
import Handshake from './handshake';
import Status from './status';
import Warning from './warning';
import Lights from './lights';
import DiskGroup from './disk-group';
import DiskPositionForm from './disk-position-form';
import ActionCreator from '../actions/app-actions';

import {appStore, sculptureStore} from '../stores';
import config from '../config';

window.anyware = window.anyware || {};
window.anyware.sculptureStore = sculptureStore;

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
    this.state = this.getStateFromStores();
    this.actions = new ActionCreator();
    this.actions.connectAndSetupClient();
  }

  componentDidMount() {
    appStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    appStore.removeChangeListener(this._onChange.bind(this));
  }

  getStateFromStores() {
    return {
      sculptureStore,
      client: appStore.getClient(),
      appState: appStore.getAppState()
    };
  }

  _onChange() {
    this.setState(this.getStateFromStores);
  }

  render() {
    let warning, controls, disks;
    let client = this.state.client || {};
    let sculptureStore = this.state.sculptureStore;
    let appState = this.state.appState;

    if (!client.connected) {
      warning = <Warning msg="disconnect" />;
    }

    let handshakelights = sculptureStore.data.get("lights").get(config.LIGHTS.HANDSHAKE_STRIP);

    return (
      <span className="sculpture-emulator">
        <TopNav
         currentGame={sculptureStore.data.get("currentGame")}
         currentUser={sculptureStore.me}
         isActive={false} />
        <div className="main-content" role="main">
          <div className="game-content">
            <Lights appState={appState} sculpture={sculptureStore} />
            <DiskGroup/>
            <DiskPositionForm />
          </div>
          <div className="sidebar-content">
            <div className="well">
              <Handshake
                handshakes={sculptureStore.data.get("handshakes")}
                lights={handshakelights}
                sculptureId={sculptureStore.me} />
            </div>
            <div className="well">
              <Status
                commandLog={ this.state.appState.commandLog }
                sculpture={sculptureStore} />
            </div>
          </div>
        </div>
        { /*warning*/ }
      </span>
    );
  }
}
