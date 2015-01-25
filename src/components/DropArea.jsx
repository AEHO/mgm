/**
 * DropArea is a component to manage an area of
 * droppable content
 */

require('./DropArea.sass');

var ACTIVE = 'ACTIVE';
var NOT_ACTIVE = 'NOT_ACTIVE';

var React = require('react');
var DropArea = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    onFilesDrop: React.PropTypes.func.isRequired,
  },

  getDefaultProps () {
    return {
      className: 'DropArea',
    }
  },

  getInitialState () {
    return {
      status: NOT_ACTIVE
    }
  },

  handleDrop (e) {
    e.preventDefault();

    var files = e.dataTransfer && e.dataTransfer.files;

    this.props.onFilesDrop && this.props.onFilesDrop(files);
    this.setState({status: NOT_ACTIVE});
  },

  handleDragLeave (e) {

    this.setState({status: NOT_ACTIVE});
  },

  handleDragOver (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";

    this.setState({status: ACTIVE});
  },

  handleClick () {
    this.refs.fileInp.getDOMNode().click();
  },

  handleFilesChange (e) {
    this.props.onFilesDrop && this.props.onFilesDrop(e.target.files);
  },

  render () {
    return (
      <div className={this.props.className}
           onDragLeave={this.handleDragLeave}
           onDragOver={this.handleDragOver}
           onDrop={this.handleDrop}
           onClick={this.handleClick}>
        <input ref="fileInp" type="file"
               multiple onChange={this.handleFilesChange} />
        <p>Drop an Audio/Video here</p>
        <p><em>or</em></p>
        <p>Click to select</p>
      </div>
    );
  }
});

module.exports = DropArea;
