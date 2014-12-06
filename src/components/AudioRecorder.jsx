/**
 * Recorder djsiud
 */

var React = require('react');
var {SoundStore} = require('../stores');
var recorder;
var _sound;
var _microphone;

var AudioRecorder = React.createClass({
  getInitialState () {
    return {
      recording: false
    }
  },

  componentDidMount () {
    _sound = SoundStore.getSoundState();
  },

  handleRecAudio () {
    navigator.getUserMedia({audio: true, video: false}, (stream) => {
      recorder = RecordRTC(stream);
      recorder.startRecording();

      var analyser = _sound
                      .Visualization
                      .createLevelVis(_sound,
                                      this.refs.soundCanvas.getDOMNode());

      _microphone = _sound.context.createMediaStreamSource(stream);
      _microphone.connect(analyser);

      this.setState({
        recording: true
      });
    }, (err) => {
      console.error(err);
    });
  },

  handleStopRecAudio () {
    _microphone.disconnect(0);
    _microphone = null;

    recorder.stopRecording((audioURL) => {
      console.log(audioURL);

      this.setState({
        recording: false
      });
    });
  },

  render () {
    var audioBtn = this.state.recording ?
      <button onClick={this.handleStopRecAudio}>Stop Audio Rec</button> :
      <button onClick={this.handleRecAudio}>Audio Rec</button>;

    return (
      <div>
        <h2>Recorder</h2>
        {audioBtn}
        <canvas ref="soundCanvas"></canvas>
      </div>
    );
  }
});

module.exports = AudioRecorder;
