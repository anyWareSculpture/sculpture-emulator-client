import React from 'react';
import PropTypes from 'prop-types';

/**
 * Non-interactive SVG light
 */
export default class Light extends React.Component {

  static propTypes = {
    active: PropTypes.bool,
    color: PropTypes.string,
    pulse: PropTypes.bool,
    intensity: PropTypes.number,
    maxIntensity: PropTypes.number,
    panelIdx: PropTypes.string,
    size: PropTypes.string,
    cx: PropTypes.string,
    cy: PropTypes.string,
    r: PropTypes.string,
  }
  constructor() {
    super();
  }

  render() {
    return <circle className='handshake-light' fill={this.props.color} cx={this.props.cx} cy={this.props.cy} r={this.props.r}/>;
  }
}
