var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var PadActions = {
  addVideo (file) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Pad.ADD_VIDEO,
      file: file
    });
  },

  sortVideos (videos) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Pad.SORT_VIDEOS,
      videos: videos
    });
  },

  removeVideo (src) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Pad.REMOVE_VIDEO,
      src: src
    });
  },

  addVideoClick (id, moment) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Pad.ADD_VIDEO_CLICK,
      id,
      moment
    });
  },

  playVideo (id) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Pad.PLAY_VIDEO,
      id
    });
  },

  stopVideo (id) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Pad.STOP_VIDEO,
      id
    });
  },

  cleanRecordings () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Pad.CLEAN_RECORDINGS
    });
  },

  startRecording () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Pad.START_RECORDING
    });
  },

  endRecording () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Pad.END_RECORDING
    });
  },
  
  playRecord () {
    AppDispatcher.handleViewAction({
      actionType:CONSTANTS.Pad.PLAY_RECORD
    });
  },

  stopRecord () {
    AppDispatcher.handleViewAction({
      actionType:CONSTANTS.Pad.STOP_RECORD
    });
  }
};

module.exports = PadActions;
