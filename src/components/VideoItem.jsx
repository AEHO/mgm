/**
 * VideoItem represents a VideoItem containing
 * Name, size and type.
 */

var React = require('react');
var VideoItem = React.createClass({
  propTypes: {
    file: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      size: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      thumb: React.PropTypes.string,
    }).isRequired
  },

  render () {
    var thumb = this.props.file.thumb ?
      <img src={this.props.file.thumb} /> :
      <p>No Thumb yet</p>;

    console.log(thumb);

    return (
      <div>
        <div>
          {thumb}
          <button>PLAY</button>
        </div>
        <div>
          <p><strong>Name:</strong> {this.props.file.name}</p>
          <p><strong>Size:</strong> {this.props.file.size}</p>
          <p><strong>Type:</strong> {this.props.file.type}</p>
        </div>
      </div>
    );
  }
});

module.exports = VideoItem;
