/*eslint no-extra-parens:0*/
import React from 'react';
import SVGPanel from './svgpanel';
import SVGLight from './svglight';
import dispatcher from '../dispatcher';
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
    const svgCoords = [
      {cx:"350", cy:"70", r:"20"},
      {cx:"150", cy:"570", r:"20"},
      {cx:"550", cy:"570", r:"20"},
    ];
      
    let svgLights = [];
    let active = false;
    for (let i = 0; i < 3; i++) {
      const state = this.props.handshake.get('handshakes').get(`sculpture${i+1}`);
      if (state === HandshakeGameLogic.HANDSHAKE_ACTIVATING || state === HandshakeGameLogic.HANDSHAKE_ACTIVE) active = true;
      svgLights.push(
        <SVGLight {...svgCoords[i]} active={false}
               color={state === HandshakeGameLogic.HANDSHAKE_OFF ? 'black' : config.getWebColor(`sculpture${i+1}`)}
               intensity={100}
               key={i}
               maxIntensity={100}/>
      );
    }
	
    const myHandshakeState = this.props.handshake.get('handshakes').get(this.props.sculptureId);
      
    const svgPanel = <SVGPanel cx="350" cy="350" r="220" active={false}
      enableToggle={false}
      color={myHandshakeState === HandshakeGameLogic.HANDSHAKE_OFF ? 'white' : active ? this.props.sculptureId : 'black'}
      intensity={100}
      key={3}
      maxIntensity={100}
      onMouseDown={() => this.activateHandshake()}
      onMouseUp={() => this.deactivateHandshake()} />;
      
    return (
        <div className="sculpture-screen">
          <svg id="handshake-view" viewBox="0 0 700 700" style={{
            position: "relative",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          }}>
            <g id="Handshake">
              {svgPanel}
              {svgLights}	
            </g>
          </svg>
          { myHandshakeState === HandshakeGameLogic.HANDSHAKE_PRESENT && <button className='btn-danger' onMouseDown={() => this.timeoutHandshake()}>Timeout</button> }
	</div>
    );
  }
}
