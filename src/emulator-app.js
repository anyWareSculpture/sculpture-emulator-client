/**
 * @fileOverview Calls initial app render when the page is ready.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {parse} from 'query-string';

import SculptureEmulator from './components/sculpture-emulator';
import './styles';
import config from './config';
import {sculptureStore} from './stores';

window.onload = () => {

  const query = parse(window.location.search);
  const debug = query.debug === 'true';

  // Apply config from the global variable anyware_config
  config.applyLocalConfig(anyware_config);
  if (debug) config.DEBUG.debugView = true;

  sculptureStore.init();
  ReactDOM.render(<SculptureEmulator debug={debug}/>, document.getElementById('content'));
};

