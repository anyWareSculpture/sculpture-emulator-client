class Warning extends React.Component {
  static displayName = 'Warning';
  static propTypes = {
    msg: React.PropTypes.string.isRequired
  }
  render() {
    let msg;
    if (this.props.msg === "disconnect") {
      msg = "You are disconnected from the streaming client. Please refresh the page to attempt to reconnect.";
    }
    return (
      <div className="alert alert-danger" role="alert">
        {msg}
      </div>
    );
  }
}

module.exports = Warning;
