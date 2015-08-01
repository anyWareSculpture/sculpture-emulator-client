let LightPanel = require('./light-panel');

class MoleGame extends React.Component {
  static displayName = 'MoleGame';
    static propTypes = {
    sculpture: React.PropTypes.object.isRequired
  };
  render() {
    let lightArray = this.props.sculpture.data.get('lights');

    let panels = [];
    for (let i = 0; i < lightArray.stripIds.length; i++) {
      let idx = lightArray.stripIds[i];
      let lights = lightArray.get(idx);
      panels.push(<LightPanel
        stripIdx={idx}
        key={idx}
        lights={lights}
        size="large" />
      );
    }
    return (
      <div className="mole-game">
        {panels}
      </div>
    );
  }
}

module.exports = MoleGame;
