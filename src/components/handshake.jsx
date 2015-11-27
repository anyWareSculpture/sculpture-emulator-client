/*eslint no-extra-parens:0*/
const React = require('react');
const Panel = require('./panel');
const AppDispatcher = require('../dispatcher/app-dispatcher');
const SculptureActionCreator = require('@anyware/game-logic/lib/actions/sculpture-action-creator');

class Handshake extends React.Component {

  static displayName = 'Handshake';
  // FIXME: implement proptypes
  static propTypes = {
    status: React.PropTypes.array.isRequired,
    username: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {isSending: false};
    this.sculptureActions = new SculptureActionCreator(AppDispatcher);
  }

  handleHandshake() {
    this.setState({isSending: !this.state.isSending});
    const user = this.props.username;
    if (this.state.isSending) {
      this.sculptureActions.sendHandshakeDeactivate(user);
    }
    else {
      this.sculptureActions.sendHandshakeActivate(user);
    }
  }

  render() {
    return (
      <div className="handshake">
        <Panel color="user0" intensity={this.props.status[0] ? 100 : 15} />
        <Panel color="user1" intensity={this.props.status[1] ? 100 : 15} />
        <Panel color="user2" intensity={this.props.status[2] ? 100 : 15} />
        <button onClick={ () => this.handleHandshake() }>
          { this.state.isSending ? "Revoke Handshake" : "Send Handshake"}
        </button>
      </div>
    );
  }
}

module.exports = Handshake;
