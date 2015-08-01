let Panel = require('./panel');

class Handshake extends React.Component {
  static displayName = 'Handshake';
  static propTypes = {
    isSending: React.PropTypes.bool.isRequired
  };
  render() {
    // TODO: get handshake status from state
    let handshakeStatus = [false, false, false];

    return (
      <div className="handshake">
        <Panel color="user0" isOn={handshakeStatus[0]} />
        <Panel color="user1" isOn={handshakeStatus[1]} />
        <Panel color="user2" isOn={handshakeStatus[2]} />
        <button>{ this.props.isSending ? "Revoke Handshake" : "Send Handshake"}</button>
      </div>
    );
  }
}

module.exports = Handshake;
