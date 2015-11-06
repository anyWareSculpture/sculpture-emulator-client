/**
 * @fileOverview Calls initial app render when the page is ready.
 */
require("babel/polyfill");
let SculptureEmulator = require('./components/sculpture-emulator');

$(document).ready(() => {
  React.render(
    <SculptureEmulator />,
    document.getElementById('container')
  );
});
