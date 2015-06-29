let Login = require('./login');

class TopNav extends React.Component {
  render() {
    let loginDropdown = <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button">
                    Login
                    <span className="caret"></span>
                  </a>
                  <div className="dropdown-menu"><Login /></div>
                </li>;

    let logoutButton = <li className="">
                  <a href="#" className="" role="button">
                    Logout
                  </a>
                </li>;

    return <nav className="top-nav">
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
      </nav>;
  }
}

module.exports = TopNav;
