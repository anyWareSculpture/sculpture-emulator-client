let Panel = require('./panel');

class Handshake extends React.Component {
  static displayName = 'Handshake';
  static propTypes = {
    connectionStatus: React.PropTypes.array.isRequired,
    isSending: React.PropTypes.bool.isRequired
  };
  render() {
    let connectionStatus = this.props.connectionStatus < 3 ?
      this.props.connectionStatus.concat[false, false, false] :
      this.props.connectionStatus;

    return (
      <div className="handshake">
        <Panel color="user0" isOn={connectionStatus[0]} />
        <Panel color="user1" isOn={connectionStatus[1]} />
        <Panel color="user2" isOn={connectionStatus[2]} />
        <button>{ this.props.isSending ? "Revoke Handshake" : "Send Handshake"}</button>
      </div>
    );
  }
}

module.exports = Handshake;
