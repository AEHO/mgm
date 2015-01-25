const AppDispatcher = require('../dispatcher/AppDispatcher');
const Store = require('./Store');
const CONSTANTS = require('../constants');
const assign = require('object-assign');

var _state = {
  showSidebar: false
};

const AppStore = assign({
  getStoreState: () => _state,

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.App.SHOW_SIDEBAR:
        _state.showSidebar = true;
        AppStore.emitChange();
        break;

      case CONSTANTS.App.HIDE_SIDEBAR:
        _state.showSidebar = false;
        AppStore.emitChange();
        break;
    }

    return true;
  })
}, Store);


module.exports = AppStore;
