let Panel = require('./panel');

class PanelStrip extends React.Component {
  static displayName = 'PanelStrip';
  static propTypes = {
    stripIdx: React.PropTypes.string.isRequired,
    strip: React.PropTypes.object.isRequired,
    size: React.PropTypes.string.isRequired,
  }
  render() {
    let panels = this.props.strip.get('panels');
    let panelViews = [];
    for (let i = 0; i < this.props.strip.panelIds.length; i++) {
      let idx = this.props.strip.panelIds[i];
      let panel = panels.get(idx);
      panelViews.push(<Panel
        enableToggle={true}
        active={panel.get('active')}
        intensity={panel.get('intensity')}
        color={panel.get('color')}
        key={i}
        panelIdx={idx}
        size={this.props.size}
        stripIdx={this.props.stripIdx} />
      );
    }
    return (
      <div className="panel-strip">
        {panelViews}
      </div>
    );
  }
}

module.exports = PanelStrip;
