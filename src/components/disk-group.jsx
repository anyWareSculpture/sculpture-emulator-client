/*eslint no-extra-parens:0*/
import React from 'react';
import DiskView from './DiskView';
import PerimeterLights from './perimeter-lights';
import Config from '../config';
import AppDispatcher from '../dispatcher/app-dispatcher';

/**
 * @class DiskGroup
 * @extends React.Component
 * @public
 *
 * Creates a group of disks for the disk game.
 */
export default class DiskGroup extends React.Component {
  static displayName = 'DiskGroup';
  static propTypes = {
    sculpture: React.PropTypes.object.isRequired
  }
  constructor() {
    super();
    this.config = new Config();
  }
  render() {
    let lights = this.props.sculpture.data
      .get("lights")
      .get(this.config.LIGHTS.PERIMETER_STRIP);
    let disks = this.props.sculpture.data
      .get("disks");
    let urls = this.config.diskUrls;

    return (
      <div className="disk-group">
        <DiskView sculpture={this.props.sculpture} config={this.config} dispatcher={AppDispatcher}/>
        <PerimeterLights lights={lights}/>
      </div>
    );
  }
}
