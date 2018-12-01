/*eslint no-extra-parens:0*/

import React from 'react';

/**
 * @class Warning
 * @extends React.Component
 * @public
 *
 * Warning box displayed at the top of the page.
 */
export default class Warning extends React.Component {

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
