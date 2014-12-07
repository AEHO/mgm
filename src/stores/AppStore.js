var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var CONSTANTS = require('../constants');
var assign = require('object-assign');

var _appState = {
	modal: {
    showing: false,
    file: false,
    replay: false,
    recording: false
  }
};

var AppStore = assign({
  getAppState: () => _appState,

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.App.CLOSE_MODAL:
      	_appState.modal.showing = false;
        _appState.modal.replay = false;
        _appState.file = false;
        _appState.recording = false;

        AppStore.emitChange();
	      break;

      case CONSTANTS.App.OPEN_MODAL:
        _appState.modal.showing = true;
        AppStore.emitChange();
        break;

      case CONSTANTS.App.START_REPLAY_MODAL:
        _appState.modal.replay = true;
        _appState.modal.file = action.file;
        AppStore.emitChange();
        break;
    }

    return true;
  })
}, Store);


module.exports = AppStore;
