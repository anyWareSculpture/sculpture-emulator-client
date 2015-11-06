/*eslint no-extra-parens:0*/
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
    let gameInfo = curGame ? this.props.sculpture.data.get(curGame) : undefined;
    return (
      <div className="status"><h3>Status</h3>
        <p>Game: { curGame } | State: { this.props.sculpture.data.get("status") }</p>
        <p>Game Info: { gameInfo ? JSON.stringify(gameInfo._data) : ""}</p>
        <hr/>
        <div className="log">{ msgs }</div>
      </div>
    );
  }
}

module.exports = Status;
