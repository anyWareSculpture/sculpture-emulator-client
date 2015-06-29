class Light extends React.Component {
  static displayName = 'Light';
  static propTypes = {
    isOn: React.PropTypes.bool,
    color: React.PropTypes.string,
    size: React.PropTypes.string
  }
  render() {
    let classList= ["light"];
    classList.push(this.props.isOn ? "light-on" : "light-off");
    classList.push("light-" + (this.props.color ? this.props.color : "black"));
    classList.push("light-" + (this.props.size ? this.props.size : "def-size"));
    return <div className={ classList.join(' ') }></div>;
  }
}

module.exports = Light;
