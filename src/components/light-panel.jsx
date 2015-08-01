let Light = require('./light');

class LightPanel extends React.Component {
  static displayName = 'LightPanel';
  static propTypes = {
    stripIdx: React.PropTypes.string.isRequired,
    lights: React.PropTypes.object.isRequired,
    size: React.PropTypes.string.isRequired,
  }
  render() {
    let panels = this.props.lights.get('panels');
    let lights = [];
    for (let i = 0; i < this.props.lights.panelIds.length; i++) {
      let idx = this.props.lights.panelIds[i];
      let light = panels.get(idx);
      lights.push(<Light
        enableToggle={true}
        active={light.get('active')}
        intensity={light.get('intensity')}
        color={light.get('color')}
        key={i}
        panelIdx={idx}
        size={this.props.size}
        stripIdx={this.props.stripIdx} />
      );
    }
    return (
      <div className="light-panel">
        {lights}
      </div>
    );
  }
}

module.exports = LightPanel;
