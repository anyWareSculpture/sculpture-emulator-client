const DefaultConfig = require('@anyware/game-logic/lib/config/default-config');

export default class Config extends DefaultConfig {
  constructor() {
    super();

    this.username = "sculpture0";

  }

  // FIXME: Configure user colors here? How to communicate that to CSS?
}

