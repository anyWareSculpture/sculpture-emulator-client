/*eslint no-extra-parens:0*/
import React from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';

/**
 * @class PanelStrip
 * @extends React.Component
 * @public
 *
 * Strip of main input panels.
 */
export default class PanelStrip extends React.Component {

  static propTypes = {
    size: PropTypes.string.isRequired,
    strip: PropTypes.object.isRequired,
    stripIdx: PropTypes.string
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
        maxIntensity={panels.maxIntensity}
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
