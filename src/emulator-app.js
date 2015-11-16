/**
 * @fileOverview Calls initial app render when the page is ready.
 */
require("babel/polyfill");
let SculptureEmulator = require('./components/sculpture-emulator');
const ReactDOM = require('react-dom');

$(document).ready(() => {
  ReactDOM.render(
    <SculptureEmulator />,
    document.getElementById('container')
  );
});
