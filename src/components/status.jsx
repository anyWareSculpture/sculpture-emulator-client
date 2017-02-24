/*eslint no-extra-parens:0*/
import React from 'react';

/**
 * @class Status
 * @extends React.Component
 * @public
 *
 * Displays information about the current sculpture data,
 * recent state udpates, and actions.
 */
export default class Status extends React.Component {
  static displayName = 'Status';
  static propTypes = {
    commandLog: React.PropTypes.array,
    sculpture: React.PropTypes.object.isRequired
  };
  render() {
    let msgs = _(this.props.commandLog).map((msg, idx) => {
      return (
        <p key={idx}>{msg}</p>
      );
    }).reverse().value();

    let curGame = this.props.sculpture.data.get("currentGame");
    let gameInfo = curGame ? this.props.sculpture.data.get(curGame) : null;

    // disk position info
    let disk = this.props.sculpture.data.get("disk");
    let disks = disk.get("disks");
    let diskInfo = {};
    for (let diskId of Object.keys(disks._data)) {
      let disk = disks.get(diskId);
      diskInfo[diskId] = {
        position: disk.get("position")
      };
    }

    return (
      <div className="status"><h3>Status</h3>
        <p>Game: { curGame } | State: { this.props.sculpture.data.get("status") }</p>
        <pre>Game Info: { gameInfo ? JSON.stringify(gameInfo.pretty(), null, 2) : "" }</pre>
        <pre>Disk Info: { JSON.stringify(disks.pretty(), null, 2) }</pre>
        <hr/>
        <div className="log">{ msgs }</div>
      </div>
    );
  }
}
