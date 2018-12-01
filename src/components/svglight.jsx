import React from 'react';

/**
 * Non-interactive SVG light
 */
export default class Light extends React.Component {

  static propTypes = {
    active: React.PropTypes.bool,
    color: React.PropTypes.string,
    intensity: React.PropTypes.number,
    maxIntensity: React.PropTypes.number,
    panelIdx: React.PropTypes.string,
    size: React.PropTypes.string,
    cx: React.PropTypes.string,
    cy: React.PropTypes.string,
    r: React.PropTypes.string,
  }
  constructor() {
    super();
  }

  render() {
    return <circle fill={this.props.color} cx={this.props.cx} cy={this.props.cy} r={this.props.r}/>;
  }
}
