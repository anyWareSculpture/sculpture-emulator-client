let LightPanel = require('./light-panel');

class MoleGame extends React.Component {
  static displayName = 'MoleGame';
  render() {
    let numLights = 10;
    return (
      <div className="mole-game">
        <LightPanel numLights={numLights} size="large" />
        <LightPanel numLights={numLights} size="large" />
        <LightPanel numLights={numLights} size="large" />
      </div>
    );
  }
}

module.exports = MoleGame;
