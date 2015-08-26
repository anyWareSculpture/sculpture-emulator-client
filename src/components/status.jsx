/*eslint no-extra-parens:0*/
class Status extends React.Component {
  static displayName = 'Status';
  static propTypes = {
    commandLog: React.PropTypes.array,
    sculpture: React.PropTypes.object.isRequired
  };
  render() {
    let msgs = _(this.props.commandLog).map((msg) => {
      return (
        <p>{msg}</p>
      );
    }).reverse().value();

    return (
      <div className="status"><h3>Status</h3>
        <p>Game: { this.props.sculpture.data.get("currentGame") } | State: { this.props.sculpture.data.get("status") }</p>
        <hr/>
        <div className="log">{ msgs }</div>
      </div>
    );
  }
}

module.exports = Status;
