var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var CONSTANTS = require('../constants');
var assign = require('object-assign');

var _padState = {
};

var PadStore = assign({
  getPadState: () => _padState,

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.Pad.ADD_VIDEO:
        console.log(action.file);
        if (action.file.name)
          _padState[(Math.random()*1000000|0) + action.file.name] = action.file;
        else
          _padState[(Math.random()*1000000|0)] = action.file;

        PadStore.emitChange();
	      break;
    }

    return true;
  })
}, Store);


module.exports = PadStore;
