class Status extends React.Component {
  static displayName = 'Status';
  render() {
    return (
      <div className="status"><h3>Status</h3>
        <ul>
          <li>Input/Output Log</li>
          <li>Debugging Info</li>
          <li>Scultpure Status</li>
        </ul>
      </div>
    );
  }
}

module.exports = Status;
