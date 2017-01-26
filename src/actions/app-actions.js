/**
 * @fileOverview Dispatches valid actions from within the app to the dispatcher.
 */

import dispatcher from '../dispatcher';
import Actions from '../constants/app-constants';

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
    dispatcher.dispatch({
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
    dispatcher.dispatch({
      actionType: Actions.APP_LOGIN,
      loginOptions: {
        username: user,
        password: pass
      }
    });
  }
}
