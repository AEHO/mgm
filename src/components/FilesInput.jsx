/**
 * FilesInput
 */

var React = require('react');
var FilesInput = React.createClass({
  propTypes: {
    onFilesSelect: React.PropTypes.func.isRequired
  },

  handleFilesChange (e) {
    this.props.onFilesSelect(e.target.files);
  },

  handleFilesSelectClick () {
    this.refs.fileInp.getDOMNode().click();
  },

  render () {
    return (
      <div>
        <input className="fileInp" ref="fileInp" type="file"
                 accept="audio/*" multiple onChange={this.handleFilesChange} />
        <button className="fileSelect" onClick={this.handleFilesSelectClick}>
            Select Files
          </button>
      </div>
    );
  }
});

module.exports = FilesInput;
