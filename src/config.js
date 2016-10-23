import DefaultConfig from 'anyware/lib/game-logic/config/default-config';

export default class Config extends DefaultConfig {
  constructor() {
    super();

    this.username = "sculpture0";

    this.CLIENT_CONNECTION_OPTIONS = {
      protocol: "wss",
      username: "sculpture0",
      password: "7f24a3e73b91dc9f51f15861d75c888a",
      host: "broker.shiftr.io"
    };

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

