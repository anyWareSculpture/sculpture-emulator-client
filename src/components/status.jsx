class Status extends React.Component {
  static displayName = 'Status';
  static propTypes = {
    commandLog: React.PropTypes.array,
    sculpture: React.PropTypes.object.isRequired
  };
  render() {
    let msgs = _(this.props.commandLog).reverse().map((msg) => {
      return (
        <p>{msg}</p>
      )
    }).value();

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
