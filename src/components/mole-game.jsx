/*eslint no-extra-parens:0*/
let PanelStrip = require('./panel-strip');

class MoleGame extends React.Component {
  static displayName = 'MoleGame';
  static propTypes = {
    appState: React.PropTypes.object.isRequired,
    sculpture: React.PropTypes.object.isRequired
  };
  render() {
    let lightArray;

    if (this.props.appState.isAnimating) {
      lightArray = this.props.appState.animPanels;
    }
    else {
      lightArray = this.props.sculpture.data.get('lights');
    }

    let strips = [];
    for (let i = 0; i < lightArray.stripIds.length; i++) {
      let idx = lightArray.stripIds[i];
      let strip = lightArray.get(idx);
      strips.push(<PanelStrip
        key={idx}
        size="large"
        strip={strip}
        stripIdx={idx} />
      );
    }
    return (
      <div className="mole-game">
        {strips}
      </div>
    );
  }
}

module.exports = MoleGame;
