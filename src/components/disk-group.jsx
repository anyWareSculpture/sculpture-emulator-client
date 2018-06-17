import React from 'react';
import DiskView from 'anyware/lib/views/DiskView';
import SimonView from 'anyware/lib/views/SimonView';
import DebugView from './DebugView';
import {sculptureStore} from '../stores';
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
          <DiskView store={sculptureStore} config={config} {...config.projectionParameters}/>
          <SimonView store={sculptureStore} config={config} {...config.projectionParameters}/>
          {config.DEBUG.debugView && <DebugView {...config.projectionParameters}/>}
        </div>
      </div>
    );
  }
}
