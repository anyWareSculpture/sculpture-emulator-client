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
    for (let i = 0; i < this.props.lights.panelIds.length; i++) {
      let idx = this.props.lights.panelIds[i];
      let panel = panels.get(idx);
      reactPanels.push(
        <Panel active={false}
               enableToggle={false}
               color={panel.get('color')}
               intensity={panel.get('intensity')}
               key={i}
               maxintensity={panels.maxintensity}/>
      );
    }

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
