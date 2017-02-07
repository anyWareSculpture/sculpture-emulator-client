/*eslint no-extra-parens:0*/

import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

import Login from './login';
import GameSelector from './game-selector';

/**
 * @class TopNav
 * @extends React.Component
 * @public
 */
export default class TopNav extends React.Component {
  static displayName = 'TopNav';
  static propTypes = {
    currentGame: React.PropTypes.string,
    isLoggedIn: React.PropTypes.bool
  };

  render() {
    return <Navbar className="navbar-inverse navbar-fixed-top">
        <Navbar.Header>
          <Navbar.Brand><a href="#">anyWare Sculpture</a></Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <GameSelector currentGame={this.props.currentGame}/>
          { this.props.isLoggedIn ?
            <li className="">
              <a className="" href="#" role="button">Logout</a>
            </li> :
            <NavDropdown id="login-dropdown" title="Login" bsRole="toggle">
              <Login/>
            </NavDropdown>
          }
        </Nav>
      </Navbar>;
  }
}
