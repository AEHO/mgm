/**
 * VideoRecoder
 */

var React = require('react');
var recorder;
var VideoRecoder = React.createClass({
  getInitialState () {
    return {
      recording: false,
      replaying: false
    }
  },

  handleRecordVideo () {
    navigator.getUserMedia({video: true, audio: false}, (stream) => {
      this.refs.videoElem.getDOMNode().src = window.URL.createObjectURL(stream);

      recorder = RecordRTC(stream);
      recorder.startRecording();
      this.setState({recording: true});
    }, (err) => {
      console.error(err);
    });
  },

  handleStopRecordVideo () {
    recorder.stopRecording((url) => {
      this.setState({
        recording: false,
        replaying: true
      });

      this.refs.videoElem.getDOMNode().src = url;
    });
  },

  render () {
    var videoRec = !this.state.recording ?
      <button onClick={this.handleRecordVideo}>Record Video</button> :
      <button onClick={this.handleStopRecordVideo}>Stop Video Recording</button>;

    var acceptOrNot = this.state.replaying ?
      <div>
        <button onClick={this.handleRefuse}>Refuse</button>
        <button onClick={this.handleAccept}>Accept</button>
      </div> :
      null;

    return (
      <div>
        <h2>Video Recorder</h2>
        {videoRec}
        <video ref="videoElem" autoPlay controls></video>
        {acceptOrNot}
      </div>
    );
  }
});

module.exports = VideoRecoder;
