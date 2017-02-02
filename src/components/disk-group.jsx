import React from 'react';
import DiskView from './DiskView';
import config from '../config';

/**
 * @class DiskGroup
 * @extends React.Component
 * @public
 *
 * Creates a group of disks for the disk game.
 */
export default class DiskGroup extends React.Component {
  render() {
    return (
      <div className="disk-group">
        <div className="sculpture-screen">
          <DiskView {...config.projectionParameters}/>
        </div>
      </div>
    );
  }
}
