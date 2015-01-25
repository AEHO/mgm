const AppDispatcher = require('../dispatcher/AppDispatcher');
const Store = require('./Store');
const CONSTANTS = require('../constants');
const assign = require('object-assign');

var _assets = {
  files: []
};

const AssetsStore = assign({
  getStoreState: () => _assets,

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.Assets.UPDATE_ASSETS:
        _assets.files = action.files;
        AssetsStore.emitChange();
        break;
    }

    return true;
  })
}, Store);


module.exports = AssetsStore;
