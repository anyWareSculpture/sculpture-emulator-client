class Light extends React.Component {
  static displayName = 'Light';
  static propTypes = {
    color: React.PropTypes.string,
    enableToggle: React.PropTypes.bool,
    isOn: React.PropTypes.bool,
    size: React.PropTypes.string
  }
  render() {
    let classList = ["light"];
    let isOn = this.props.isOn;

    let toggleOn = function toggleOn(light) {
      if (isOn) {
        light.target.className = light.target.className.replace('light-on', 'light-off');
      }
      else {
        light.target.className = light.target.className.replace('light-off', 'light-on');
      }
      isOn = !isOn;
    };

    classList.push(isOn ? "light-on" : "light-off");
    classList.push("light-" + (this.props.color ? this.props.color : "black"));
    classList.push("light-" + (this.props.size ? this.props.size : "def-size"));
    return <div className={ classList.join(' ') } onClick={ this.props.enableToggle ? toggleOn.bind(this) : '' }></div>;
  }
}

module.exports = Light;
