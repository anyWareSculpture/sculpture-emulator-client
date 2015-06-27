let React = require('../../bower_components/react/react.js');
let $ = require('../../bower_components/jquery/dist/jquery.js');

let SculptureEmulator = React.createClass({
  render: () => {
    return <span className="sculpture-emulator">Sculpture Emulator Client!</span>;
  }
});

module.exports = SculptureEmulator;

$(document).ready(() => {
  React.render(<SculptureEmulator />, document.getElementById('container'));
});
