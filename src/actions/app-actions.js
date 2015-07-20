let AppDispatcher = require('../dispatcher/app-dispatcher');
let Actions = require('../constants/app-constants');

export default class AppActions {
  connectAndSetupClient(options) {
    AppDispatcher.dispatch({
      actionType: Actions.APP_CLIENT_SETUP,
      loginOptions: options
    });
  }

  login(user, pass) {
    AppDispatcher.dispatch({
      actionType: Actions.APP_LOGIN,
      loginOptions: {
        username: user,
        password: pass
      }
    });
  }
}
