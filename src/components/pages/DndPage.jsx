/**
 * DndPage: demo page regarding Drag N Drop
 */

var VQ = require('../../utils/VQ');
var updateWithKey = require('../../utils/updateWithKey');
var React = require('react');
var DropArea = require('../DropArea.jsx');
var FilesInput = require('../FilesInput.jsx');
var VideoItem = require('../VideoItem.jsx');
var _slice = Array.prototype.slice;

var _vq;

var DndPage = React.createClass({
  getInitialState () {
    return {
      files: []
    };
  },

  handleFilesSelect (fileList) {
    var files = this.state.files.slice();

    for (var i = 0; i < fileList.length; i++) {
      var file = fileList[i];

      files.push(file);
      _vq.add(file);
    }

    this.setState({
      files: files
    });
  },

  handleVQChange (file) {
    this.setState({
      files: updateWithKey(this.state.files, file, 'lastModified')
    });
  },

  componentDidMount () {
    _vq = new VQ(this.refs.videoElem.getDOMNode(),
                 this.refs.canvasElem.getDOMNode());
    _vq.addChangeListener(this.handleVQChange);
  },

  render () {
    var cssHidden = {
      visibility: 'hidden',
      position: 'absolute'
    };

    var files = this.state.files.map((file, i) => {
      return <li key={i}><VideoItem file={file}/></li>
    });

    return (
      <div>
        <h1>Dnd</h1>
        <div>
          <canvas style={cssHidden} ref="canvasElem"></canvas>
          <video style={cssHidden} ref="videoElem"></video>
        </div>

        <div>
          <DropArea onFilesDrop={this.handleFilesSelect} />
          <FilesInput onFilesSelect={this.handleFilesSelect} />
        </div>

        <div>
          <ul>
            {files}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = DndPage;
