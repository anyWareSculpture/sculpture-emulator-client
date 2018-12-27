/*eslint no-extra-parens:0*/

import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

import Login from './login';
import GameSelector from './game-selector';

import {version} from '../../package.json';

export default class TopNav extends React.Component {

  static propTypes = {
    currentGame: React.PropTypes.string,
    currentUser: React.PropTypes.string,
    debug: React.PropTypes.bool,
  };

  loginMenu() {
      if (this.props.debug) {
        return <Nav>
          <GameSelector currentGame={this.props.currentGame}/>
          <NavDropdown id="login-dropdown" title={this.props.currentUser || 'Login'} bsRole="toggle">
            <Login/>
          </NavDropdown>
        </Nav>
      }
      else {
          return <Navbar.Text pullRight>{this.props.currentUser}</Navbar.Text>;
      }
  }

  render() {
    return <Navbar className="navbar-inverse navbar-fixed-top">
        <Navbar.Header>
          <Navbar.Brand><a href="#">anyWare Sculpture {version}</a></Navbar.Brand>
        </Navbar.Header>
        { this.loginMenu() }
      </Navbar>;
  }
}
