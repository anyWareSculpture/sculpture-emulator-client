let AppDispatcher = require('../dispatcher/app-dispatcher');
let {PanelsActionCreator} = require('@anyware/game-logic');

class Panel extends React.Component {
  static displayName = 'Panel';
  static propTypes = {
    active: React.PropTypes.bool,
    color: React.PropTypes.string,
    enableToggle: React.PropTypes.bool,
    intensity: React.PropTypes.number,
    panelIdx: React.PropTypes.string,
    size: React.PropTypes.string,
    stripIdx: React.PropTypes.string
  }
  constructor() {
    super();
    this.panelActions = new PanelsActionCreator(AppDispatcher);
  }

  render() {
    let classList = ["panel"];
    let stripIdx = this.props.stripIdx;
    let panelIdx = this.props.panelIdx;
    let active = this.props.active;
    let intensity = this.props.intensity;

    let clickHandler = function clickHandler() {
      this.panelActions.sendPanelPressed(stripIdx, panelIdx, !active);
    };

    // FIXME: interpret `active` at game level (ex: mole game active => 100)
    // and allow dynamic intensity setting (not just on/off)
    classList.push(intensity > 0 || active ? "panel-on" : "panel-off");
    classList.push("panel-" + (this.props.color ? this.props.color : "black"));
    classList.push("panel-" + (this.props.size ? this.props.size : "def-size"));
    return (
      <div className={ classList.join(' ') }
      // onMouseDown={ this.props.enableToggle ? mouseDownHandler.bind(this) : '' }
      // onMouseUp={ this.props.enableToggle ? mouseUpHandler.bind(this) : '' }
      onClick={this.props.enableToggle ? clickHandler.bind(this) : '' }
      ></div>
    );
  }
}

module.exports = Panel;
