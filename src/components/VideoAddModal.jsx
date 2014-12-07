/**
 * VideoAddModal
 */

var DropArea = require('./DropArea.jsx');
var {AppActions, PadActions} = require('../actions');
var superagent = require('superagent');
var VideoRecorder = require('./VideoRecorder.jsx');
var Modal = require('./Modal.jsx');
var React = require('react');

var _recorder = null;

var VideoAddModal = React.createClass({
  getInitialState () {
    return {
      file: null
    }
  },

	handleFileDrop (file) {
    this.setState({
      file: file,
      screen: 'replay'
    });
	},

	handleAccept () {
    var fd = new FormData();
    fd.append('name', this.state.videoData.name);
    fd.append('contents', this.state.videoData.contents);

    var request = new XMLHttpRequest();
    request.open("POST", '/upload', true);
    request.onload = (oEvent) => {
      PadActions.addVideo(request.responseText);
    };

    request.send(fd);
	},

	handleRefuse () {
    this.setState({
      file: null,
      screen: this.state.screen
    });
    AppActions.closeModal();
	},

  handleRecordVideoBtn () {
    navigator.getUserMedia({video: true, audio: false}, (stream) => {
      this.setState({
        file: stream,
        screen: 'record'
      });
    }, (err) => {
      console.error(err);
    });
  },

  handleStartRecording () {
    _recorder = RecordRTC(this.state.file);
    _recorder.startRecording();

    this.setState({
      screen: 'recording',
      file: this.state.file
    });
  },

  handleFinishRecording () {
    _recorder.stopRecording((url) => {
      var blob = _recorder.getBlob();

      _recorder.getDataURL((dataUrl) => {
        this.setState({
          screen: 'replay-stream',
          file: url,
          videoData: {
            name: (Math.random()*100|0) + '.' + blob.type.split('/')[1],
            type: blob.type,
            contents: dataUrl
          }
        }, () => {
          this.refs.videoElem.getDOMNode().load();
        });
      });
    });
  },

	render () {
    var video = null;

    if (this.state.screen === 'replay') {
  		video =
      	<div>
          <video autoPlay controls width="300">
            <source src={window.URL.createObjectURL(this.state.file)} />
          </video>
  				<button onClick={this.handleRefuse}>Recusar</button>
  				<button onClick={this.handleAccept}>Aceitar</button>
  			</div>;
    } else if (this.state.screen === 'replay-stream') {
      video =
        <div>
          <video ref="videoElem" autoPlay width="300">
            <source src={this.state.file} />
          </video>
          <button onClick={this.handleRefuse}>Recusar</button>
          <button onClick={this.handleAccept}>Aceitar</button>
        </div>;
    } else if (this.state.screen === 'record') {
      video =
        <div>
          <video autoPlay width="300">
            <source src={window.URL.createObjectURL(this.state.file)} />
          </video>
          <button onClick={this.handleStartRecording}>REC!</button>
        </div>;
    } else if (this.state.screen === 'recording') {
      video =
        <div>
          <video autoPlay width="300">
            <source src={window.URL.createObjectURL(this.state.file)} />
          </video>
          <button onClick={this.handleFinishRecording}>FINISH</button>
        </div>;
    }

		return (
			<Modal className="Modal" title="Adicionar um Video">
				<button class="btnRecord" onClick={this.handleRecordVideoBtn}>Gravar Video</button>
				<DropArea onFileDrop={this.handleFileDrop} />
				{video}
			</Modal>
		);
	}
});

module.exports = VideoAddModal;
