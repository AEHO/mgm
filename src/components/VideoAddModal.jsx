/**
 * VideoAddModal
 */

var DropArea = require('./DropArea.jsx');
var {AppActions, PadActions} = require('../actions');
var VideoRecorder = require('./VideoRecorder.jsx');
var Modal = require('./Modal.jsx');
var React = require('react');

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
    PadActions.addVideo(this.state.file);
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
    recorder = RecordRTC(this.state.file);
    recorder.startRecording();

    this.setState({
      screen: 'recording',
      file: this.state.file
    });
  },

  handleFinishRecording () {
    recorder.stopRecording((url) => {
      console.log(url);

      this.setState({
        screen: 'replay-stream',
        file: url
      });

      this.refs.videoElem.getDOMNode().load();
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
          <video ref="videoElem" autoPlay controls width="300">
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
			<Modal title="Adicionar um Video">
				<button onClick={this.handleRecordVideoBtn}>Gravar Video</button>
				<DropArea onFileDrop={this.handleFileDrop} />
				{video}
			</Modal>
		);
	}
});

module.exports = VideoAddModal;
