require("babel/polyfill");
let SculptureEmulator = require('./components/sculpture-emulator');

$(document).ready(() => {
  React.render(
    <SculptureEmulator />,
    document.getElementById('container')
  );
});
