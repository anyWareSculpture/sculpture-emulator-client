/*eslint no-extra-parens:0*/
const React = require('react');
let AppDispatcher = require('../dispatcher/app-dispatcher');
let DisksActionCreator = require('anyware/lib/game-logic/actions/disks-action-creator');
const Disk = require('anyware/lib/game-logic/utils/disk');

/**
 * @class DiskPositionForm
 * @extends React.Component
 * @public
 *
 * Form to allow user to enter the exact disk positions.
 * This is primarily for testing purposes.
 */
export default class DiskPositionForm extends React.Component {
  static displayName = 'DiskPositionForm';

  constructor() {
    super();
    this.diskActions = new DisksActionCreator(AppDispatcher);
    this.state = {
      disk0: 0,
      disk1: 0,
      disk2: 0
    };
  }

  formSubmit(e) {
    e.preventDefault();

    for (let diskId of ["disk0", "disk1", "disk2"]) {
      this.diskActions.sendDiskUpdate(diskId, {
        position: this.state[diskId]
      });
    }
  }

  handleChange(e) {
    let key = e.target.id;
    let update = {};
    update[key] = e.target.value;
    this.setState(update);
  }

  render() {
    return (
      <div className="disk-position-form">
        Disk Game Shortcut:
        <form onSubmit={this.formSubmit.bind(this)}>
          Disk 0: <input id="disk0"
                         type="text"
                         value={this.state.disk0}
                         onChange={this.handleChange.bind(this)} /><br />
          Disk 1: <input id="disk1"
                         type="text"
                         value={this.state.disk1}
                         onChange={this.handleChange.bind(this)} /><br />
          Disk 2: <input id="disk2"
                         type="text"
                         value={this.state.disk2}
                         onChange={this.handleChange.bind(this)} /><br /><br />
          <input type="submit" className="btn btn-default" value="Submit" />
        </form>
      </div>
    );
  }
}
