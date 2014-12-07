/**
 * @jsx React.DOM
 */

var React = require('react');
var {PadStore} = require('../../stores');
var {PadActions} = require('../../actions');

var Controller = React.createClass({
  handleRecord () {
    if(this.props.recording){
      PadActions.endRecording(); 
    }else{
      PadActions.startRecording(); 
    }
  },

  handleReproduction () {
    if (this.props.playing) {
      PadActions.stopRecord();
    }
    else {
      PadActions.playRecord();
    }
  },

  handleStoreChange () {
    this.setState({recording: PadStore.getPadState().recording});
  },

  render() {
    return (
      <div className="controller">
        <button onClick={this.handleRecord}>
          {this.props.recording ? "Recording..." : "Record"}
        </button>
        <button onClick={this.handleReproduction}>
          {this.props.playing ? "Stop" : "Play"}
        </button>
      </div>
    );
  }
});

module.exports = Controller;
