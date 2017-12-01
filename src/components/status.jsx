/*eslint no-extra-parens:0*/
import React from 'react';

/**
 * @class Status
 * @extends React.Component
 * @public
 *
 * Displays information about the current sculpture data,
 * recent state udpates, and actions.
 */
export default class Status extends React.Component {
  static displayName = 'Status';
  static propTypes = {
    commandLog: React.PropTypes.array,
    sculpture: React.PropTypes.object.isRequired
  };
  render() {
    const msgs = _(this.props.commandLog).map((msg, idx) => <p key={idx}>{msg}</p>).reverse().value();
    const currentGame = this.props.sculpture.data.get("currentGame");
    const status = this.props.sculpture.data.get("status")
    const handshakeState = this.props.sculpture.data.get("handshake").get("state");
    const gameInfo = currentGame ? this.props.sculpture.data.get(currentGame) : null;

    return (
      <div className="status"><h3>Status</h3>
        <p>Game: { currentGame } | State: { status } | { handshakeState }</p>
        <pre>{ currentGame } game: { gameInfo ? JSON.stringify(gameInfo.pretty(), null, 2) : "" }</pre>
        <hr/>
        <div className="log">{ msgs }</div>
      </div>
    );
  }
}
