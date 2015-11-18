/**
 * @fileOverview Dispatches valid actions from within the app to the dispatcher.
 */

let AppDispatcher = require('../dispatcher/app-dispatcher');
let Actions = require('../constants/app-constants');

export default class AppActions {
  /**
   * Dispatches APP_CLIENT_SETUP action
   * @param  {Object} options contains login information
   *                  { username:
   *                    password:
   *                    host:
   *                  }
   *                  Optional argument, app logs in as read only by default
   */
  connectAndSetupClient(options) {
    AppDispatcher.dispatch({
      actionType: Actions.APP_CLIENT_SETUP,
      loginOptions: options
    });
  }

  /**
   * Dispatches APP_LOGIN action
   * @param  {string} user is the username used for login.
   * @param  {string} pass is the password used for login.
   */
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
