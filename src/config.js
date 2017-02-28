import DefaultConfig from 'anyware/lib/game-logic/config/default-config';
import GAMES from 'anyware/lib/game-logic/constants/games';

class Config extends DefaultConfig {
  constructor() {
    super();

    this.DEBUG.console = true;

    this.CLIENT_CONNECTION_OPTIONS = {
      protocol: "wss",
      username: "anyware",
      password: "anyware",
      host: "broker.shiftr.io"
    };

    this.diskUrls = {
      disk0: 'images/disk0.png',
      disk1: 'images/disk1.png',
      disk2: 'images/disk2.png'
    };

    this.projectionParameters = {
      scale: 1,
      translate: [0, 0],
    };

//    this.GAMES_SEQUENCE = [
//      GAMES.DISK,
//      GAMES.SIMON
//    ];

  }

  // FIXME: Configure user colors here? How to communicate that to CSS?
}

export default new Config();
