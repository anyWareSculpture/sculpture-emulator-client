/*eslint no-extra-parens:0*/
const React = require('react');
let Disk = require('./disk');
let PerimeterLights = require('./perimeter-lights');
const Config = require('../config');

export default class DiskGroup extends React.Component {
  static displayName = 'DiskGroup';
  static propTypes = {
    sculpture: React.PropTypes.object.isRequired
  }
  constructor() {
    super();
    this.config = new Config();
  }
  render() {
    // let panels = this.props.strip.get('panels');
    // let diskViews = [];
    // for (let i = 0; i < this.props.strip.panelIds.length; i++) {
    //   let idx = this.props.strip.panelIds[i];
    //   let panel = panels.get(idx);
    //   diskViews.unshift(<Panel
    //     active={panel.get('active')}
    //     color={panel.get('color')}
    //     enableToggle={true}
    //     intensity={panel.get('intensity')}
    //     key={i}
    //     maxintensity={panels.maxintensity}
    //     panelIdx={idx}
    //     size={this.props.size}
    //     stripIdx={this.props.stripIdx} />
    //   );
    // }
    console.log(this.props.sculpture.data.get("disks"));

    let lights = this.props.sculpture.data
      .get("lights")
      .get(this.config.LIGHTS.PERIMETER_STRIP);
    console.log(lights);
    return (
      <div className="disk-group">
        <Disk diskNum="0" imgUrl="../../images/Puzzle_12_disk0.png" />
        <Disk diskNum="1" imgUrl="../../images/Puzzle_12_disk1.png" />
        <Disk diskNum="2" imgUrl="../../images/Puzzle_12_disk2.png" />
        <PerimeterLights lights={lights}/>
      </div>
    );
  }
}
