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

        AppStore.emitChange();
	      break;

      case CONSTANTS.App.OPEN_MODAL:
        _appState.modal.showing = true;
        AppStore.emitChange();
        break;

        _appState.modal.replay = true;
        _appState.modal.file = action.file;
        AppStore.emitChange();
        break;

    }

    return true;
  })
}, Store);


module.exports = AppStore;
