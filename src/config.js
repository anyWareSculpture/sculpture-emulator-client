const DefaultConfig = require('@anyware/game-logic/lib/config/default-config');

export default class Config extends DefaultConfig {
  constructor() {
    super();

    this.username = "sculpture0";

    this.diskUrls = {
      disk0: 'images/disk0.png',
      disk1: 'images/disk1.png',
      disk2: 'images/disk2.png'
    };

    this.handshakeStatusPanels = [
      "1",
      "2",
      "3"
    ];
  }
  // FIXME: Configure user colors here? How to communicate that to CSS?
}

