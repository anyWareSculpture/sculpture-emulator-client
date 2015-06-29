let Light = require('./light');

class Handshake extends React.Component {
  static displayName = 'Handshake';
  static propTypes = {
    isSending: React.PropTypes.bool
  }
  render() {
    return (
      <div className="handshake">
        <Light color="blue" isOn={true} />
        <Light color="red" isOn={false} />
        <Light color="green" isOn={false} />
        <button>{ this.props.isSending ? "Revoke Handshake" : "Send Handshake"}</button>
      </div>
    );
  }
}

module.exports = Handshake;
