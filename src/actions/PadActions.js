var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {
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

};

module.exports = AppActions;
