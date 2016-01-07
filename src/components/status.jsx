/*eslint no-extra-parens:0*/
const React = require('react');

class Status extends React.Component {
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
    let disks = this.props.sculpture.data.get("disks");
    let diskInfo = {};
    for (let diskId of Object.keys(disks._data)) {
      let disk = disks.get(diskId);
      diskInfo[diskId] = {
        position: disk.get("position")
      }
    }

    return (
      <div className="status"><h3>Status</h3>
        <p>Game: { curGame } | State: { this.props.sculpture.data.get("status") }</p>
        <p>Game Info: { gameInfo ? JSON.stringify(gameInfo._data) : ""}</p>
        <p>Disk Info: {JSON.stringify(diskInfo)}</p>
        <hr/>
        <div className="log">{ msgs }</div>
      </div>
    );
  }
}

module.exports = Status;
