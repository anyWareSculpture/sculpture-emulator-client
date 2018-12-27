/*eslint no-extra-parens:0*/
import React from 'react';
import PropTypes from 'prop-types';

import TopNav from './top-nav';
import {Button} from 'react-bootstrap';
import Handshake from './handshake';
import Status from './status';
import Warning from './warning';
import Lights from './lights';
import DiskGroup from './disk-group';
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

  static propTypes = {
    debug: PropTypes.bool,
    // Optional username/password for auto-login
    username: PropTypes.string,
    password: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = this.getStateFromStores();
    this.actions = new ActionCreator();
    const {username, password} = this.props;
    this.actions.connectAndSetupClient({username, password});
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

  mainPage() {
      const sculptureStore = this.state.sculptureStore;
      const appState = this.state.appState;
      const handshakelights = sculptureStore.data.get("lights").get(config.LIGHTS.HANDSHAKE_STRIP);

      if (appStore.getAudioState() == 'running' || this.state.startButtonPressed) {
          return <div className="game-content">
            <Lights debug={this.props.debug} appState={appState} sculpture={sculptureStore} />
            <DiskGroup/>
            <Handshake
               debug={this.props.debug}
               handshake={sculptureStore.data.get("handshake")}
               lights={handshakelights}
               sculptureId={sculptureStore.me} />
          </div>;
      }
      else {
          return <div className='start-button'><Button bsSize='large' className='btn-success' onMouseDown={() => {
              appStore.resumeAudio();
              this.setState({startButtonPressed: true});
          }}>Start anyWare</Button></div>;
      }
  }

  render() {
    let warning;
    let client = this.state.client || {};
    const sculptureStore = this.state.sculptureStore;
    const appState = this.state.appState;

    if (!client.connected) {
      warning = <Warning msg="disconnect" />;
    }

    return (
      <div className="sculpture-emulator">
        <TopNav
         currentGame={sculptureStore.data.get("currentGame")}
         currentUser={sculptureStore.me}
         debug={this.props.debug} />
        <div className="main-content" role="main">
          { this.mainPage() }
          <div className="sidebar-content">
            { this.props.debug && <div className="well">
              <Status
                commandLog={ this.state.appState.commandLog }
                sculpture={sculptureStore} />
            </div> }
          </div>
        </div>
        { /*warning*/ }
      </div>
    );
  }
}
