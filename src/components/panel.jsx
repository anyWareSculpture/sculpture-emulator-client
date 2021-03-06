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
export default class Panel extends React.Component {

  static propTypes = {
    active: PropTypes.bool,
    color: PropTypes.string,
    enableToggle: PropTypes.bool,
    intensity: PropTypes.number,
    maxIntensity: PropTypes.number,
    panelIdx: PropTypes.string,
    size: PropTypes.string,
    stripIdx: PropTypes.string
  }
  constructor() {
    super();
    this.panelActions = new PanelsActionCreator(dispatcher);
  }

  render() {
    let classList = ["panel"];
    let stripIdx = this.props.stripIdx;
    let panelIdx = this.props.panelIdx;
    let active = this.props.active;
    let intensity = this.props.intensity;
    let enableToggle = this.props.enableToggle;
    let color = this.props.color ? this.props.color : "black";

    let mouseDownHandler = function mouseDownHandler() {
      this.panelActions.sendPanelPressed(stripIdx, panelIdx, true);
    };

    let mouseUpHandler = function mouseUpHandler() {
      window.setTimeout(() => {
        // set timeout to avoid an infinite loop when actions are
        // received too close together
        this.panelActions.sendPanelPressed(stripIdx, panelIdx, false);
      }, 50);
    };

    classList.push(active ? "panel-active-" + color : "panel-off");
    classList.push("panel-" + color);
    classList.push("panel-" + (this.props.size ? this.props.size : "def-size"));

    let inlineStyle = {};
    if (intensity === 0 && enableToggle) {
      inlineStyle = {
        opacity: 1,
        backgroundColor: 'black'
      };
    }
    else {
      inlineStyle = {
        opacity: intensity / (this.props.maxIntensity || 100)
      };
    }

    let borderClasses = [
      "panel-border",
      "panel-border-" + (this.props.size ? this.props.size : "def"),
      "panel-" + panelIdx
    ];

    return (
      <div className={borderClasses.join(' ')}>
        <div className={ classList.join(' ') }
        onMouseDown={this.props.enableToggle ? mouseDownHandler.bind(this) : '' }
        onMouseUp={this.props.enableToggle ? mouseUpHandler.bind(this) : '' }
        onMouseLeave={this.props.enableToggle ? mouseUpHandler.bind(this) : '' }
        style={inlineStyle}
        ></div>
      </div>
    );
  }
}
