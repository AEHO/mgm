var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var CONSTANTS = require('../constants');
var assign = require('object-assign');

var _padState = {
  videos: [
    {src: "./assets/mov_bbb.mp4"},
    {src: "./assets/dizzy.webm"}
  ]
};

var PadStore = assign({
  getPadState: () => _padState,

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    console.log(action);

    switch (action.actionType) {
      case CONSTANTS.Pad.ADD_VIDEO:
        _padState.videos.push({src: action.file});

        PadStore.emitChange();
	      break;

      case CONSTANTS.Pad.SORT_VIDEOS:
        _padState.videos = action.videos;
        console.log(_padState.videos);
        break;
    }

    return true;
  })
}, Store);


module.exports = PadStore;
