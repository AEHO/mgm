/**
 * VideoItem represents a VideoItem containing
 * Name, size and type.
 */

require('./VideoItem.sass');

const React = require('react');
const VideoItem = React.createClass({
  propTypes: {
    file: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      size: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      thumb: React.PropTypes.string,
    }).isRequired
  },

  render () {
    const fileType = this.props.file.type.match(/video\/*./) ?
      'video' :
      'music';

    const thumb = this.props.file.thumb ?
      this.props.file.thumb :
      `assets/${fileType}.svg`;

    const style = {
      background: `linear-gradient(to bottom, transparent, #666), url("${thumb}")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };

    return (
      <div className="VideoItem">
        <div className="item" style={style}>
          <p>{this.props.file.name}</p>
        </div>
      </div>
    );
  }
});

module.exports = VideoItem;
