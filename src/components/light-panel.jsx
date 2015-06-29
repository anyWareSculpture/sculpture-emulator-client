let Light = require('./Light.js');

class LightPanel extends React.Component {
  render() {
    let lights = [];
    for (let i = 0; i < (this.props.numLights || 5); i++) {
      lights.push(<Light key={i} isOn={false} size={this.props.size} />);
    }
    return <div className="light-panel">
      {lights}
    </div>;
  }
}

module.exports = LightPanel;
