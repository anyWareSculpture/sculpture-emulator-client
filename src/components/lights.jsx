/*eslint no-extra-parens:0*/
import React from 'react';
import PanelStrip from './panel-strip';

/**
 * @class Lights
 * @extends React.Component
 * @public
 *
 * Contains all primary input PanelStrips, and determines when to override
 * sculpture data with animated lightArray data.
 */
export default class Lights extends React.Component {

  static propTypes = {
    appState: React.PropTypes.object.isRequired,
    sculpture: React.PropTypes.object.isRequired
  };

  renderRGBStrips() {
    const lightArray = this.props.sculpture.data.get('lights');
    let renderedstrips = [];
    for (let i=0;i<2;i++) {
      const color = lightArray.getColor(this.props.sculpture.config.LIGHTS.RGB_STRIPS, ''+i);
      const intensity = lightArray.getIntensity(this.props.sculpture.config.LIGHTS.RGB_STRIPS, ''+i);
      const classList = ['panel', 'light_strip'];

      let inlineStyle = {};
      if (intensity === 0) {
        inlineStyle = {
          opacity: 1,
          backgroundColor: 'black'
        };
      }
      else {
        inlineStyle = {
          opacity: intensity / (lightArray.getMaxIntensity(this.props.sculpture.config.LIGHTS.RGB_STRIPS) || 100)
        };
      }
      
      classList.push(`panel-${color}`);
      renderedstrips.push(<div key={i} className={classList.join(' ')} style={inlineStyle}/>);
    }
    return renderedstrips;
  }

  renderHighPowerLeds() {
    const lightArray = this.props.sculpture.data.get('lights');
    let renderedstrips = [];
    for (let i=0;i<3;i++) {
      const color = lightArray.getColor(this.props.sculpture.config.LIGHTS.ART_LIGHTS_STRIP, ''+i);
      const intensity = lightArray.getIntensity(this.props.sculpture.config.LIGHTS.ART_LIGHTS_STRIP, ''+i);
      const classList = ['panel', 'light_strip'];

      let inlineStyle = {};
      if (intensity === 0) {
        inlineStyle = {
          opacity: 1,
          backgroundColor: 'black'
        };
      }
      else {
        inlineStyle = {
          opacity: intensity / (lightArray.getMaxIntensity(this.props.sculpture.config.LIGHTS.ART_LIGHTS_STRIP) || 100)
        };
      }
      
      classList.push(`panel-${color}`);
      renderedstrips.push(<div key={i} className={classList.join(' ')} style={inlineStyle}/>);
    }
    return renderedstrips;
  }

  render() {
    const lightArray = this.props.sculpture.data.get('lights');

    let strips = [];
    for (let i = 0; i < 3; i++) {
      let idx = lightArray.stripIds[i];
      let strip = lightArray.get(idx);
      strips.push(<PanelStrip
        key={idx}
        size="large"
        strip={strip}
        stripIdx={idx} />
      );
    }
    return <div>
      <div>
        <span style={{marginRight: '50px'}}>{this.renderRGBStrips()}</span>
        <span>{this.renderHighPowerLeds()}</span>
      </div>
      <div className="lights">
        {strips}
      </div>
    </div>;
  }
}
