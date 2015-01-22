/**
 * DropArea is a component to manage an area of
 * droppable content
 */

var ACTIVE = 'ACTIVE';
var NOT_ACTIVE = 'NOT_ACTIVE';

var React = require('react');
var DropArea = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node,

    onFilesDrop: React.PropTypes.func.isRequired,
  },

  getDefaultProps () {
    return {
      className: 'DropArea',
      children: <span>"Drop Here"</span>
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

  render () {
    return (
      <div className={this.props.className}
           onDragLeave={this.handleDragLeave}
           onDragOver={this.handleDragOver}
           onDrop={this.handleDrop}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = DropArea;
