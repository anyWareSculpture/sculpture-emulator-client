let Light = require('./light');

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
        <Light color="blue" isOn={connectionStatus[0]} />
        <Light color="red" isOn={connectionStatus[1]} />
        <Light color="green" isOn={connectionStatus[2]} />
        <button>{ this.props.isSending ? "Revoke Handshake" : "Send Handshake"}</button>
      </div>
    );
  }
}

module.exports = Handshake;
