/*eslint no-extra-parens:0*/
import React from 'react';
import Panel from './panel';

/**
 * @class PerimeterLights
 * @extends React.Component
 * @public
 *
 * Lights positioned around the disks.
 */
export default class PerimeterLights extends React.Component {

  static PropTypes = {
    lights: React.PropTypes.object.isRequired
  };
  render() {
    let panelIds = this.props.lights.panelIds;
    let panels = this.props.lights.get("panels");

    let reactPanels = [];
    panelIds.forEach((idx) => {
      let panel = panels.get(idx);
      reactPanels.unshift(<Panel
        active={panel.get('active')}
        color={panel.get('color')}
        enableToggle={false}
        intensity={panel.get('intensity')}
        key={idx}
        maxintensity={this.props.lights.get("maxIntensity")}
        panelIdx={idx}
        size="small" />
      );
    });

    return (
      <div className="perimeter-lights">
        {reactPanels}
      </div>
    );
  }
}