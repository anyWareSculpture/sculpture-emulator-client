class Login extends React.Component {
  static displayName = 'Login';
  render() {
    return (
      <form className="form-login">
        <label className="sr-only" htmlFor="inputUsername">Username</label>
        <input autoFocus className="form-control" id="inputUsername" placeholder="Username" required type="username" />
        <label className="sr-only" htmlFor="inputPassword">Password</label>
        <input className="form-control" id="inputPassword" placeholder="Password" required type="password" />
        <button className="submit" type="submit">Login</button>
      </form>
    );
  }
}

module.exports = Login;
