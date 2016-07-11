/*eslint no-extra-parens:0*/
import React from 'react';
import Disk from './disk';
import PerimeterLights from './perimeter-lights';
import Config from '../config';

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
        <Disk disk={disks.get("disk0")}
              diskId="disk0"
              imgUrl={urls.disk0}
              sculpture={this.props.sculpture} />
        <Disk disk={disks.get("disk1")}
              diskId="disk1"
              imgUrl={urls.disk1}
              sculpture={this.props.sculpture} />
        <Disk disk={disks.get("disk2")}
              diskId="disk2"
              imgUrl={urls.disk2}
              sculpture={this.props.sculpture} />
        <PerimeterLights lights={lights}/>
      </div>
    );
  }
}
