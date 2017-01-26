import React from 'react';
import DiskView from './DiskView';

/**
 * @class DiskGroup
 * @extends React.Component
 * @public
 *
 * Creates a group of disks for the disk game.
 */
export default class DiskGroup extends React.Component {
  static displayName = 'DiskGroup';

  constructor() {
    super();
  }

  render() {
    return (
      <div className="disk-group">
        <DiskView/>
      </div>
    );
  }
}
