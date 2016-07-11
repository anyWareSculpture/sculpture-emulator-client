/**
 * @fileOverview Calls initial app render when the page is ready.
 */
import 'babel-polyfill';
import SculptureEmulator from './components/sculpture-emulator';
const React = require('react');
const ReactDOM = require('react-dom');

$(document).ready(() => {
  ReactDOM.render(
    <SculptureEmulator />,
    document.getElementById('container')
  );
});
