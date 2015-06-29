class Login extends React.Component {
  static displayName = 'Login';
  render() {
    return (
      <form className="form-login">
        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input type="username" id="inputUsername" className="form-control" placeholder="Username" required autofocus />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        <button className="submit" type="submit">Login</button>
      </form>
    );
  }
}

module.exports = Login;
