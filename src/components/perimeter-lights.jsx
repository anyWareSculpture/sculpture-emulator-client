/*eslint no-extra-parens:0*/
const React = require('react');
let Panel = require('./panel');

export default class PerimeterLights extends React.Component {
  static displayName = "PerimeterLights";
  static PropTypes = {
    lights: React.PropTypes.object.isRequired
  };
  render() {
    let panelIds = this.props.lights.panelIds;
    let panels = this.props.lights.get("panels");
console.log("klights");
console.log(this.props.lights.get("maxIntensity"));


    let reactPanels = [];
    panelIds.forEach((idx) => {
      let panel = panels.get(idx);
      console.log(panel.get("intensity"));
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