/*eslint no-extra-parens:0*/
const React = require('react');
let AppDispatcher = require('../dispatcher/app-dispatcher');
const SculptureActionCreator = require('anyware/lib/game-logic/actions/sculpture-action-creator');

/**
 * @class GameSelector
 * @extends React.Component
 * @public
 *
 * Allows user to select a game to start (and end the previous game).
 * Primarily for testing purposes.
 */
export default class GameSelector extends React.Component {
  static displayName = 'GameSelector';
  static propTypes = {
    currentGame: React.PropTypes.string
  }
  constructor() {
    super();
    this.sculptureActionCreator = new SculptureActionCreator(AppDispatcher);
  }

  _onSelectionChange(e) {
    this.game = e.target.value;

    this.sculptureActionCreator.sendStartGame(this.game);
  }

  render() {
    this.game = this.props.currentGame;
    return (
      <form>
        <input checked={ this.game === "mole" ? "checked" : ""} id="mole"
          name="gameSelector" onChange={ this._onSelectionChange.bind(this) }
          type="radio" value="mole" />
        <label htmlFor="mole">Mole Game</label>
        <br/>
        <input checked={ this.game === "disk" ? "checked" : ""} id="disk"
          name="gameSelector" onChange={ this._onSelectionChange.bind(this) }
          type="radio" value="disk" />
        <label htmlFor="disk">Disk Game</label>
        <br/>
        <input checked={ this.game === "simon" ? "checked" : ""} id="simon"
          name="gameSelector" onChange={ this._onSelectionChange.bind(this) }
          type="radio" value="simon" />
        <label htmlFor="simon">Simon Game</label>
        <br/>
      </form>
    );
  }
}
