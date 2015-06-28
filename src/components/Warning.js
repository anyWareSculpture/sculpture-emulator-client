class Warning extends React.Component {
  render() {
    let msg;
    if (this.props.msg === "disconnect") {
      msg = "You are disconnected from the streaming client. Please refresh the page to attempt to reconnect.";
    }
    return <div className="alert alert-danger" role="alert">
              {msg}
            </div>;
  }
}

module.exports = Warning;
