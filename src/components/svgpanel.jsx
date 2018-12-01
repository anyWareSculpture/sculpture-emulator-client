/*eslint no-extra-parens:0*/
import React from 'react';
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
    cx: React.PropTypes.string,
    cy: React.PropTypes.string,
    r: React.PropTypes.string,
    active: React.PropTypes.bool,
    color: React.PropTypes.string,
    intensity: React.PropTypes.number,
    maxIntensity: React.PropTypes.number,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
  }
  constructor() {
    super();
    this.panelActions = new PanelsActionCreator(dispatcher);
  }

  render() {
    let active = this.props.active;
    let intensity = this.props.intensity;

    return (
      <circle fill={this.props.color} cx={this.props.cx} cy={this.props.cy} r={this.props.r}
        onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp} />
    );
  }
}
