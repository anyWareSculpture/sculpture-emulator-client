/**
 * @fileOverview Calls initial app render when the page is ready.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import SculptureEmulator from './components/sculpture-emulator';

ReactDOM.render(<SculptureEmulator />, document.getElementById('container'));
