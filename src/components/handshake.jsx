/*eslint no-extra-parens:0*/
const React = require('react');
const Panel = require('./panel');
const AppDispatcher = require('../dispatcher/app-dispatcher');
const SculptureActionCreator = require('@anyware/game-logic/lib/actions/sculpture-action-creator');

class Handshake extends React.Component {

  static displayName = 'Handshake';
  // FIXME: implement proptypes
  static propTypes = {
    handshakes: React.PropTypes.object.isRequired,
    lights: React.PropTypes.object.isRequired,
    username: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.sculptureActions = new SculptureActionCreator(AppDispatcher);
  }

  activateHandshake() {
    const user = this.props.username;
    this.sculptureActions.sendHandshakeDeactivate(user);
  }

  deactivateHandshake() {
    const user = this.props.username;
    this.sculptureActions.sendHandshakeActivate(user);
  }

  render() {
    console.log(this.props.handshakes);
    let panelIds = this.props.lights.panelIds;
    let panels = this.props.lights.get("panels");

    let reactPanels = [];
    panelIds.forEach((idx) => {
      if (idx === "0") return;
      let panel = panels.get(idx);
      reactPanels.unshift(<Panel
        active={panel.get('active')}
        color={panel.get('color')}
        enableToggle={false}
        intensity={panel.get('intensity')}
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

module.exports = Handshake;
