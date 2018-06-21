import DefaultConfig from 'anyware/lib/game-logic/config/default-config';
import GAMES from 'anyware/lib/game-logic/constants/games';

class Config extends DefaultConfig {
  constructor() {
    super();

    this.DEBUG.console = true;

    this.CLIENT_CONNECTION_OPTIONS = {
      username: "anyware",
      password: "anyware",
//      protocol: "ws",
//      host: "broker.shiftr.io",
      protocol: "wss",
      host: "excellent-model.cloudmqtt.com",
      port: 443,
    };

    this.projectionParameters = {
      scale: 1,
      translate: [0, 0],
      rotate: 0,
    };

  }
}

export default new Config();
