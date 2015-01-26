/**
 * VideoItem represents a VideoItem containing
 * Name, size and type.
 */

require('./VideoItem.sass');

const React = require('react');
const {AppActions} = require('../actions');
const {AppStore} = require('../stores');
const {storesGlueMixin} = require('../mixins');

const VideoItem = React.createClass({
  mixins: [storesGlueMixin(AppStore)],

  getStateFromStores: AppStore.getStoreState,

  propTypes: {
    file: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      size: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      thumb: React.PropTypes.string,
    }).isRequired
  },

  handleDragStart () {
    AppActions.movingInternalAsset();
  },

  handleDragEnd () {
    AppActions.notMovingInternalAsset();
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

    const klass = this.state.movingInternalAsset ?
      "VideoItem is-dragging" :
      "VideoItem";

    return (
      <div className={klass}
           draggable={true}
           onDragStart={this.handleDragStart}
           onDragEnd={this.handleDragEnd} >
        <div className="item" style={style}>
          <p>{this.props.file.name}</p>
        </div>
      </div>
    );
  }
});

module.exports = VideoItem;
