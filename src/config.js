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

    this.projectionParameters = {
      scale: 1,
      translate: [0, 0],
    };

  }
}

export default new Config();
