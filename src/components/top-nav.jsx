let Login = require('./login');

class TopNav extends React.Component {
  static displayName = 'TopNav';
  static propTypes = {
    isLoggedIn: React.PropTypes.bool
  };

  _onDropdownSubmit(e) {
    // close dropdown on submit
    $(e.target.parentNode.parentNode).find('[data-toggle="dropdown"]').dropdown('toggle');
  }

  render() {
    let loginDropdown = (
      <li className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button">
          Login
          <span className="caret"></span>
        </a>
        <div className="dropdown-menu"><Login parentSubmit={this._onDropdownSubmit.bind(this)} /></div>
      </li>
    );

    let logoutButton = (
      <li className="">
        <a className="" href="#" role="button">
          Logout
        </a>
      </li>
      );

    return (
      <nav className="top-nav">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">anyWare Sculpture</a>
          </div>
          <div id="navbar">
            <ul>
              { this.props.isLoggedIn ? logoutButton : loginDropdown }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

module.exports = TopNav;
