let Light = require('./Light.js');

class Handshake extends React.Component {
  render() {
    return <div className="handshake">
        <Light isOn={true} color="blue" />
        <Light isOn={false} color="red" />
        <Light isOn={false} color="green" />
        <button>{ this.props.isSending ? "Revoke Handshake" : "Send Handshake"}</button>
      </div>;
  }
}

module.exports = Handshake;
