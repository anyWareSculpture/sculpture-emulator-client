/*eslint no-extra-parens:0*/
const React = require('react');
let AppDispatcher = require('../dispatcher/app-dispatcher');
let DisksActionCreator = require('@anyware/game-logic/lib/actions/disks-action-creator');
const Disk = require('@anyware/game-logic/lib/utils/disk');
const SculptureStore = require('@anyware/game-logic/lib/sculpture-store');

export default class DiskView extends React.Component {
  static displayName = 'DiskView';
  static propTypes = {
    disk: React.PropTypes.object.isRequired,
    diskId: React.PropTypes.string.isRequired,
    imgUrl: React.PropTypes.string,
    sculpture: React.PropTypes.object
  };

  constructor() {
    super();
    this.diskActions = new DisksActionCreator(AppDispatcher);
  }

  componentDidMount() {
    this.props.sculpture.on(SculptureStore.EVENT_CHANGE, this._moveDisks.bind(this));
  }

  componentWillUnmount() {
    this.props.sculpture.removeListener(SculptureStore.EVENT_CHANGE, this._moveDisks.bind(this));
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  _moveDisks() {
    setTimeout(() => {
      let disk = this.props.disk;
      let dir = disk.get("direction");
      if(disk.get("state") == Disk.STATE_READY
        &&  dir != Disk.STOPPED) {
        // send a disk update
        let rotFactor = 3;
        let pos = disk.get("position") + (dir === Disk.CLOCKWISE ? 1 : -1) * rotFactor;

        if (pos < 0) {
          pos += 360; // todo grab this from config? make it yourself..... do the disk positiono have to be between 0-30 or is this just sunjays text emulator
        }
        else {
          pos %= 360;
        }
        this.diskActions.sendDiskUpdate(this.props.diskId, {
          position: pos
        });
      }
    }, 750);
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
    ctx.rotate(this.disk.get("position")*Math.PI/180);

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
