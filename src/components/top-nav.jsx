/*eslint no-extra-parens:0*/

import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

import Login from './login';
import GameSelector from './game-selector';

import {version} from '../../package.json';

/**
 * @class TopNav
 * @extends React.Component
 * @public
 */
export default class TopNav extends React.Component {

  static propTypes = {
    currentGame: React.PropTypes.string,
    currentUser: React.PropTypes.string,
    isLoggedIn: React.PropTypes.bool,
    debug: React.PropTypes.bool,
  };

  render() {
    return <Navbar className="navbar-inverse navbar-fixed-top">
        <Navbar.Header>
          <Navbar.Brand><a href="#">anyWare Sculpture {version}</a></Navbar.Brand>
        </Navbar.Header>
        <Nav>
          { this.props.debug && <GameSelector currentGame={this.props.currentGame}/> }
          { this.props.isLoggedIn ?
            <li className="">
              <a className="" href="#" role="button">Logout</a>
            </li> :
            <NavDropdown id="login-dropdown" title={this.props.currentUser || 'Login'} bsRole="toggle">
              <Login/>
            </NavDropdown>
          }
        </Nav>
      </Navbar>;
  }
}
