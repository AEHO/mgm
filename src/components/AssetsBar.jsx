/**
 * AssetsBar: demo page regarding Drag N Drop
 */

require('./AssetsBar.sass');

const {AssetsActions} = require('../actions');
const React = require('react');
const VQ = require('../utils/VQ');
const {AssetsStore} = require('../stores');
const updateWithKey = require('../utils/updateWithKey');
const DropArea = require('./DropArea.jsx');
const VideoItem = require('./VideoItem.jsx');
const {storesGlueMixin} = require('../mixins');
var _vq;

var AssetsBar = React.createClass({
  mixins: [storesGlueMixin(AssetsStore)],

  getStateFromStores: AssetsStore.getStoreState,

  handleFilesSelect (fileList) {
    var files = this.state.files.slice();

    for (var i = 0; i < fileList.length; i++) {
      var file = fileList[i];

      files.push(file);

      if (file.type.match(/video\/*./))
        _vq.add(file);
    }

    AssetsActions.updateAssets(files);
  },

  handleVQChange (file) {
    AssetsActions.updateAssets(
      updateWithKey(this.state.files, file, 'lastModified')
    );
  },

  componentDidMount () {
    _vq = new VQ(this.refs.videoElem.getDOMNode(),
                 this.refs.canvasElem.getDOMNode());
    _vq.addChangeListener(this.handleVQChange);
  },

  render () {
    var files = this.state.files.map((file, i) => {
      return <li key={i}><VideoItem file={file}/></li>
    });

    var assets = files.length ?
      <ul>{files}</ul> :
      <p>Empty assets list. Drop something above or select from your computer!</p>;

    return (
      <aside className="AssetsBar">
        <h1>Assets</h1>
        <DropArea onFilesDrop={this.handleFilesSelect} />

        {assets}

        <canvas ref="canvasElem"></canvas>
        <video ref="videoElem"></video>
      </aside>
    );
  }
});

module.exports = AssetsBar;
