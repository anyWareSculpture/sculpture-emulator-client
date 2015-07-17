let SculptureEmulator = require('./sculpture-emulator')

// Note: pass isConnected as property for now, until connecting to streaming server is implemented.
$(document).ready(() => {
  React.render(<SculptureEmulator game="mole" isConnected={false}/>, document.getElementById('container'));
});
