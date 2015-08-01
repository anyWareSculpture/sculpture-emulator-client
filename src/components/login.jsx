let ActionCreator = require('../actions/app-actions');

export default class Login extends React.Component {
  static displayName = 'Login';
  static propTypes = {
    parentSubmit: React.PropTypes.func
  }
  constructor() {
    super();
    this.Actions = new ActionCreator();
    this.state = {
      username: "",
      password: ""
    };
  }

  _loginHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    if (_.isFunction(this.props.parentSubmit)) {
      this.props.parentSubmit(e);
    }
    this.Actions.login(this.state.username, this.state.password);
    // TODO: Clear these values on submit
  }

  _usernameChanged(e) {
    this.setState({username: e.target.value});
  }

  _passwordChanged(e) {
    this.setState({password: e.target.value});
  }

  render() {
    return (
      <form className="form-login" onSubmit={this._loginHandler.bind(this)} >
        <label className="sr-only" htmlFor="inputUsername">Username</label>
        <input
          autoFocus
          className="form-control"
          id="inputUsername"
          onChange={this._usernameChanged.bind(this)}
          placeholder="Username"
          required type="username"
          value={this.username} />
        <label className="sr-only" htmlFor="inputPassword">Password</label>
        <input
          className="form-control"
          id="inputPassword"
          onChange={this._passwordChanged.bind(this)}
          placeholder="Password"
          required
          type="password"
          value={this.password} />
        <button className="submit" type="submit">Login</button>
      </form>
    );
  }
}
