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
    maxIntensity: React.PropTypes.number,
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

    let clickHandler = function clickHandler() {
      this.panelActions.sendPanelPressed(stripIdx, panelIdx, true);
      window.setTimeout(() => {
        // set timeout on turning toggling to inactive panel state
        this.panelActions.sendPanelPressed(stripIdx, panelIdx, false);
      }, 750);
    };

    classList.push(active ? "panel-active-" + color : "panel-off");
    classList.push("panel-" + color);
    classList.push("panel-" + (this.props.size ? this.props.size : "def-size"));


    let inlineStyle = {}
    if (intensity == 0 && enableToggle) {
      inlineStyle = {
        opactity: 1,
        backgroundColor: 'white'
      }
    }
    else {
      inlineStyle = {
        opacity: intensity / ( this.props.maxIntensity || 100 )
      }
    }

    return (
      <div className={ classList.join(' ') } style={inlineStyle}
      onClick={this.props.enableToggle ? clickHandler.bind(this) : '' }
      ></div>
    );
  }
}

module.exports = Panel;
