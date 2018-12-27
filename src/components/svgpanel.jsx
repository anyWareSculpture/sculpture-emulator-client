/*eslint no-extra-parens:0*/
import React from 'react';
import PropTypes from 'prop-types';
import PanelsActionCreator from 'anyware/lib/game-logic/actions/panels-action-creator';

import dispatcher from '../dispatcher';

/**
 * @class Panel
 * @extends React.Component
 * @public
 *
 * View for each light, with an optional toggle to send panel press when clicked.
 */
export default class SVGPanel extends React.Component {

  static propTypes = {
    cx: PropTypes.string,
    cy: PropTypes.string,
    r: PropTypes.string,
    active: PropTypes.bool,
    color: PropTypes.string,
    pulse: PropTypes.bool,
    intensity: PropTypes.number,
    maxIntensity: PropTypes.number,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
  }
  constructor() {
    super();
    this.panelActions = new PanelsActionCreator(dispatcher);
  }

  render() {
    const active = this.props.active;
    const intensity = this.props.intensity;
    const cls = this.props.pulse && 'handshake-pulse';
    return (
      <circle className={`handshake-light ${cls}`} fill={this.props.color} cx={this.props.cx} cy={this.props.cy} r={this.props.r}
        onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp} />
    );
  }
}
