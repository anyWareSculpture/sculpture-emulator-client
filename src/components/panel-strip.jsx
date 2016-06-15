/*eslint no-extra-parens:0*/
const React = require('react');
let Panel = require('./panel');

/**
 * @class PanelStrip
 * @extends React.Component
 * @public
 *
 * Strip of main input panels.
 */
export default class PanelStrip extends React.Component {
  static displayName = 'PanelStrip';
  static propTypes = {
    size: React.PropTypes.string.isRequired,
    strip: React.PropTypes.object.isRequired,
    stripIdx: React.PropTypes.string
  }
  render() {
    let panels = this.props.strip.get('panels');
    let panelViews = [];
    for (let i = 0; i < this.props.strip.panelIds.length; i++) {
      let idx = this.props.strip.panelIds[i];
      let panel = panels.get(idx);
      panelViews.unshift(<Panel
        active={panel.get('active')}
        color={panel.get('color')}
        enableToggle={true}
        intensity={panel.get('intensity')}
        key={i}
        maxintensity={panels.maxintensity}
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
