/**
 * DndPage: demo page regarding Drag N Drop
 */

var VQ = require('../../utils/VQ');
var React = require('react');
var DropArea = require('../DropArea.jsx');
var _slice = Array.prototype.slice;
var _vq;

var DndPage = React.createClass({
  getInitialState () {
    return {
      files: []
    };
  },

  handleFileDrop (file) {
    var files = _slice.call(this.state.files);

    files.push(file);
    _vq.add(file);

    this.setState({
      files: files
    });
  },

  handleVQChange (data) {
    console.log(data);
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
      return <li key={i}>{file.name}</li>
    });

    return (
      <div>
        <h1>Dnd</h1>
        <div>
          <canvas style={cssHidden} ref="canvasElem"></canvas>
          <video style={cssHidden} ref="videoElem"></video>
        </div>

        <DropArea onFileDrop={this.handleFileDrop} />

        <div>
          <p>Assets</p>
          <ul>
            {files}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = DndPage;
