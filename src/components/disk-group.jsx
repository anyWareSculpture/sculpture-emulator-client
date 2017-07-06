import React from 'react';
import DiskView from './DiskView';
import DebugView from './DebugView';
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
          {config.DEBUG.debugView && <DebugView {...config.projectionParameters}/>}
        </div>
      </div>
    );
  }
}
