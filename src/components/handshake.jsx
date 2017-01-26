/*eslint no-extra-parens:0*/
import React from 'react';
import Panel from './panel';
import dispatcher from '../dispatcher';
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

  static displayName = 'Handshake';
  // FIXME: implement proptypes
  static propTypes = {
    handshakes: React.PropTypes.object.isRequired,
    lights: React.PropTypes.object.isRequired,
    username: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.sculptureActions = new SculptureActionCreator(dispatcher);
    this.panelActions = new PanelsActionCreator(dispatcher);
    this.state = {
      "sculpture0": {
        isActive: false,
        color: "user0"
      },
      "sculpture1": {
        isActive: false,
        color: "user1"
      },
      "sculpture2": {
        isActive: false,
        color: "user2"
      }
    };
  }

  activateHandshake() {
    const user = this.props.username;
    this.sculptureActions.sendHandshakeActivate(user);
    let data = {};
    data[this.props.username] = { isActive: true, color: "user0" };
    this.setState(data);
  }

  deactivateHandshake() {
    const user = this.props.username;
    this.sculptureActions.sendHandshakeDeactivate(user);
  }

  render() {
    let panelIds = config.handshakeStatusPanels;
    let panels = this.props.lights.get('panels');

    let reactPanels = [];
    panelIds.forEach((idx) => {
      let username = "sculpture" + (idx-1)
      let panel = panels.get(idx);
      reactPanels.unshift(<Panel
        active={false}
        color={this.state[username].color}
        enableToggle={false}
        intensity={this.state[username].isActive ? 100 : 15}
        key={idx}
        maxintensity={this.props.lights.get("maxIntensity")}
        panelIdx={idx} />
      );
    });

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
