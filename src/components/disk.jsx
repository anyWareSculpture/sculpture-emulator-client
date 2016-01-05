/*eslint no-extra-parens:0*/
const React = require('react');
let AppDispatcher = require('../dispatcher/app-dispatcher');
let DisksActionCreator = require('@anyware/game-logic/lib/actions/disks-action-creator');

export default class Disk extends React.Component {
  static displayName = 'Disk';
  static propTypes = {
    diskNum: React.PropTypes.string.isRequired,
    imgUrl: React.PropTypes.string
  };

  constructor() {
    super();
    this.diskActions = new DisksActionCreator(AppDispatcher);
  }

  render() {
    let classList = [
      "disk",
      "disk-" + this.props.diskNum
    ];

    let canvasId = "canvas-disk-" + this.props.diskNum;
    let imgId = "img-disk-" + this.props.diskNum;

    let drawCanvas = function() {
      console.log("drawCanvas");
      let cc = document.getElementById(canvasId);
      let i = document.getElementById(imgId);
      let ctx = cc.getContext("2d");
      let scale = 0.3;
      ctx.drawImage(i, 0, 0, i.width * scale, i.height * scale);
    };

    return (
      <div className={classList.join(' ')} onLoad={drawCanvas.bind(this)}>
      <canvas width="300" height="300" id={canvasId}></canvas>
      <img id={imgId} src={this.props.imgUrl}/>
      </div>
    );
  }
}
