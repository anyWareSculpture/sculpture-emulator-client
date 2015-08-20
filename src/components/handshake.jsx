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
        <Panel color="user0" intensity={handshakeStatus[0] ? 100 : 15} />
        <Panel color="user1" intensity={handshakeStatus[1] ? 100 : 15 }/>
        <Panel color="user2" intensity={handshakeStatus[2] ? 100 : 15} />
        <button>{ this.props.isSending ? "Revoke Handshake" : "Send Handshake"}</button>
      </div>
    );
  }
}

module.exports = Handshake;
