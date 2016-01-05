/*eslint no-extra-parens:0*/
const React = require('react');
let AppDispatcher = require('../dispatcher/app-dispatcher');
let DisksActionCreator = require('@anyware/game-logic/lib/actions/disks-action-creator');
const Disk = require('@anyware/game-logic/lib/utils/disk');

export default class DiskView extends React.Component {
  static displayName = 'DiskView';
  static propTypes = {
    disk: React.PropTypes.object.isRequired,
    diskId: React.PropTypes.string.isRequired,
    imgUrl: React.PropTypes.string
  };

  constructor() {
    super();
    this.diskActions = new DisksActionCreator(AppDispatcher);
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  drawCanvas() {
    let c = document.getElementById(this.canvasId);
    let i = document.getElementById(this.imgId);
    let ctx = c.getContext("2d");

    let scale = 0.3;
    let i_width = i.width * scale;
    let i_height = i.height * scale;

    // clear canvas of previous contents
    ctx.clearRect(0,0,c.width,c.height);
    ctx.save();
    ctx.translate(c.width/2,c.height/2);
    // rotate the canvas to the specified degrees
    console.log("disk position");
    console.log(this.disk.get("position"));
    ctx.rotate(this.disk.get("position")*360/30*Math.PI/180);



    ctx.drawImage(i, -i_width/2, -i_height/2, i_width, i_height);
    ctx.restore();

  }

  render() {
    let classList = [
      "disk",
      this.props.diskId
    ];

    this.canvasId = "canvas-" + this.props.diskId;
    this.imgId = "img-" + this.props.diskId;
    this.disk = this.props.disk;



    let onImageLoad = function() {
      this.imgLoaded = true;
      this.drawCanvas();
    };

    return (
      <div className={classList.join(' ')} >
      <canvas width="300" height="300" id={this.canvasId}></canvas>
      <img id={this.imgId} src={this.props.imgUrl} onLoad={onImageLoad.bind(this)}/>
      </div>
    );
  }
}
