let Light = require('./light');

class LightPanel extends React.Component {
  static displayName = 'LightPanel';
  static propTypes = {
    numLights: React.PropTypes.number.isRequired,
    size: React.PropTypes.string
  }
  render() {
    let lights = [];
    for (let i = 0; i < this.props.numLights; i++) {
      lights.push(<Light isOn={false} key={i} size={this.props.size} />);
    }
    return (
      <div className="light-panel">
        {lights}
      </div>
    );
  }
}

module.exports = LightPanel;
