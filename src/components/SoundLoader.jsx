/**
 * SoundLoader ...
 */
require('./SoundLoader.css');
var React = require('react');
var {SoundStore} = require('../stores');
var DropArea = require('./DropArea.jsx');

var SoundLoader = React.createClass({
  getInitialState () {
    return {
      assets: {
        'id': {
          type: 'audio',
          buffer: [],
          node: {}
        }
      }
    }
  },

  componentDidMount () {
    _sound = SoundStore.getSoundState();
  },

  handleFileChange (e) {
    _sound.loadLocalFiles(e.target.files).then((buffers) => {
      console.log('all files resolved! Cool!');
      console.log(buffers);
    }, (err) => {
      console.error(err);
      console.error('Loading files Failed');
    });
  },

  // REIMPLEMENT
  handleAudioButtonClick (e) {
    switch (e.target.dataset.type) {
      case 'play':
      var source = _sound.context.createBufferSource();

      source.buffer = this.state.file.buffer;
      var [analyser, jsNode] = this._createVis();

      source.connect(analyser);
      analyser.connect(jsNode);

      source.connect(_sound.context.destination);
      source.start(0);
      break;
    }
  },

  handleFileSelectClick () {
    this.refs.fileInp.getDOMNode().click();
  },

  handleFileDrop (file) {
    console.log(file);
  },

  render () {
    return (
      <div className="SoundLoader">
        <h2>SoundLoader</h2>
        <label>Load a sound ...</label>
        <div>
          <input className="fileInp" ref="fileInp" type="file"
                 accept="audio/*" multiple onChange={this.handleFileChange} />
          <DropArea onFileDrop={this.handleFileDrop} />
          <button className="fileSelect" onClick={this.handleFileSelectClick}>Select Files</button>
        </div>
        <button data-type="play" onClick={this.handleAudioButtonClick}>Play</button>
        <button data-type="pause" onClick={this.handleAudioButtonClick}>Pause</button>
        <button data-type="resume" onClick={this.handleAudioButtonClick}>Resume</button>
      </div>
    );
  }
});

module.exports = SoundLoader;
