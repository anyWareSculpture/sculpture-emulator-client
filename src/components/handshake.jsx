/*eslint no-extra-parens:0*/
import React from 'react';
import Panel from './panel';
import dispatcher from '../dispatcher';
import SculptureStore from 'anyware/lib/game-logic/sculpture-store';
import SculptureActionCreator from 'anyware/lib/game-logic/actions/sculpture-action-creator';
import PanelsActionCreator from 'anyware/lib/game-logic/actions/panels-action-creator';
import HandshakeGameLogic from 'anyware/lib/game-logic/logic/handshake-game-logic';
import config from '../config';

/**
 * @class Handshake
 * @extends React.Component
 * @public
 *
 * Displays handshake panels, and provides a button to send a handshake.
 */
export default class Handshake extends React.Component {
  static propTypes = {
    handshake: React.PropTypes.object.isRequired,
    lights: React.PropTypes.object.isRequired,
    sculptureId: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.sculptureActions = new SculptureActionCreator(dispatcher);
    this.panelActions = new PanelsActionCreator(dispatcher);
  }

  activateHandshake() {
    this.sculptureActions.sendHandshakeAction(this.props.sculptureId, HandshakeGameLogic.HANDSHAKE_ACTIVE);
  }

  deactivateHandshake() {
    this.sculptureActions.sendHandshakeAction(this.props.sculptureId, HandshakeGameLogic.HANDSHAKE_PRESENT);
  }

  timeoutHandshake() {
    this.sculptureActions.sendHandshakeAction(this.props.sculptureId, HandshakeGameLogic.HANDSHAKE_OFF);
  }

  render() {
    let panels = this.props.lights.get('panels');

    let reactPanels = [];
    let active = false;
    for (let i = 0; i < 3; i++) {
      let idx = this.props.lights.panelIds[i];
      let panel = panels.get(idx);
      const state = this.props.handshake.get('handshakes').get(`sculpture${i+1}`);
      if (state === HandshakeGameLogic.HANDSHAKE_ACTIVATING || state === HandshakeGameLogic.HANDSHAKE_ACTIVE) active = true;
      reactPanels.push(
        <Panel active={false}
               enableToggle={false}
               color={state === HandshakeGameLogic.HANDSHAKE_OFF ? 'black' : `sculpture${i+1}`}
               intensity={100}
               key={i}
               maxintensity={100}/>
      );
    }
    const globalState = this.props.handshake.get('state');
    const myHandshakeState = this.props.handshake.get('handshakes').get(this.props.sculptureId);
    reactPanels.push(
      <Panel active={false}
             enableToggle={false}
             color={myHandshakeState == HandshakeGameLogic.HANDSHAKE_OFF ? 'white' : active ? this.props.sculptureId : 'black'}
             intensity={100}
             key={3}
             maxintensity={100}/>
    );

    return (
      <div className="handshake">
        {reactPanels}
        <button className="btn-success" onMouseDown={() => this.activateHandshake()}
                onMouseUp={() => this.deactivateHandshake()}>Handshake</button>
        <button className={myHandshakeState === HandshakeGameLogic.HANDSHAKE_PRESENT ? 'btn-danger' : 'btn-default disabled'} onMouseDown={() => this.timeoutHandshake()}>Timeout</button>
      </div>
    );
  }
}
