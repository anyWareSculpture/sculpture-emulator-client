/*eslint no-extra-parens:0*/
import React from 'react';
import Panel from './panel';
import dispatcher from '../dispatcher';
import SculptureStore from 'anyware/lib/game-logic/sculpture-store';
import SculptureActionCreator from 'anyware/lib/game-logic/actions/sculpture-action-creator';
import PanelsActionCreator from 'anyware/lib/game-logic/actions/panels-action-creator';
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
    handshakes: React.PropTypes.object.isRequired,
    lights: React.PropTypes.object.isRequired,
    sculptureId: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.sculptureActions = new SculptureActionCreator(dispatcher);
    this.panelActions = new PanelsActionCreator(dispatcher);
  }

  activateHandshake() {
    this.sculptureActions.sendHandshakeAction(this.props.sculptureId, SculptureStore.HANDSHAKE_ACTIVE);
  }

  deactivateHandshake() {
    this.sculptureActions.sendHandshakeAction(this.props.sculptureId, SculptureStore.HANDSHAKE_PRESENT);
  }

  render() {
    let panels = this.props.lights.get('panels');

    let reactPanels = [];
    let active = false;
    for (let i = 0; i < 3; i++) {
      let idx = this.props.lights.panelIds[i];
      let panel = panels.get(idx);
      const state = this.props.handshakes.get(`sculpture${i+1}`);
      if (state === SculptureStore.HANDSHAKE_ACTIVE) active = true;
      reactPanels.push(
        <Panel active={false}
               enableToggle={false}
               color={state === SculptureStore.HANDSHAKE_OFF ? 'black' : `sculpture${i+1}`}
               intensity={100}
               key={i}
               maxintensity={100}/>
      );
    }
    reactPanels.push(
      <Panel active={false}
             enableToggle={false}
             color={active ? 'white' : 'black'}
             intensity={100}
             key={3}
             maxintensity={100}/>
    );

    return (
      <div className="handshake">
        {reactPanels}
        <button onMouseDown={ () => this.activateHandshake() }
                onMouseUp={ () => this.deactivateHandshake() } >
          Send Handshake
        </button>
      </div>
    );
  }
}
