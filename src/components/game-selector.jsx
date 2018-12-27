/*eslint no-extra-parens:0*/
import React from 'react';
import PropTypes from 'prop-types';
import {NavDropdown, MenuItem} from 'react-bootstrap';
import dispatcher from '../dispatcher';
import SculptureActionCreator from 'anyware/lib/game-logic/actions/sculpture-action-creator';

/**
 * @class GameSelector
 * @extends React.Component
 * @public
 *
 * Allows user to select a game to start (and end the previous game).
 * Primarily for testing purposes.
 */
export default class GameSelector extends React.Component {
  static propTypes = {
    currentGame: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.sculptureActionCreator = new SculptureActionCreator(dispatcher);
  }

  _onSelectionChange(game) {
    // FIXME: This should really send a "select next game" action, and the game should only be started
    // if we're not in global alone mode. Consider if sendStartGame() ever needs an argument.
    this.sculptureActionCreator.sendStartGame(game);
  }

  render() {
    const game = this.props.currentGame;
    return <NavDropdown id="game-selector" title="Select Game" onSelect={this._onSelectionChange.bind(this)}>
      <MenuItem eventKey="mole" id="mole" active={game === "mole"}>Mole Game</MenuItem>
      <MenuItem eventKey="disk" id="disk" active={game === "disk"}>Disk Game</MenuItem>
      <MenuItem eventKey="simon" id="simon" active={game === "simon"}>Simon Game</MenuItem>
    </NavDropdown>;
  }
}
