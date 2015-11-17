/*eslint no-extra-parens:0*/
let AppDispatcher = require('../dispatcher/app-dispatcher');
let {PanelsActionCreator} = require('@anyware/game-logic');

class Panel extends React.Component {
  static displayName = 'Panel';
  static propTypes = {
    active: React.PropTypes.bool,
    color: React.PropTypes.string,
    enableToggle: React.PropTypes.bool,
    intensity: React.PropTypes.number,
    maxIntensity: React.PropTypes.number,
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
    let enableToggle = this.props.enableToggle;
    let color = this.props.color ? this.props.color : "black";

    let mouseDownHandler = function mouseDownHandler() {
      this.panelActions.sendPanelPressed(stripIdx, panelIdx, true);
    };

    let mouseUpHandler = function mouseUpHandler() {
      window.setTimeout(() => {
        // set timeout to avoid an infinite loop when actions are
        // received too close together
        this.panelActions.sendPanelPressed(stripIdx, panelIdx, false);
      }, 300);
    };

    classList.push(active ? "panel-active-" + color : "panel-off");
    classList.push("panel-" + color);
    classList.push("panel-" + (this.props.size ? this.props.size : "def-size"));

    let inlineStyle = {};
    if (intensity === 0 && enableToggle) {
      inlineStyle = {
        opacity: 1,
        backgroundColor: 'darkgrey'
      };
    }
    else {
      inlineStyle = {
        opacity: intensity / (this.props.maxIntensity || 100)
      };
    }

    return (
      <div className={ classList.join(' ') }
      onMouseDown={this.props.enableToggle ? mouseDownHandler.bind(this) : '' }
      onMouseUp={this.props.enableToggle ? mouseUpHandler.bind(this) : '' }
      style={inlineStyle}
      ></div>
    );
  }
}

module.exports = Panel;
