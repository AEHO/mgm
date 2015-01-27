const AppDispatcher = require('../dispatcher/AppDispatcher');
const Store = require('./Store');
const {AssetsActions} = require('../actions');
const CONSTANTS = require('../constants');
const assign = require('object-assign');

var _assets = {
  files: []
};

fetch('assets/a.mp3')
  .then((response) => response.blob())
  .then((blob) => {
    var file = assign({}, blob, {name: 'a.mp3'})

    AssetsActions.addAsset(file);
  });

const AssetsStore = assign({
  getStoreState: () => _assets,

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.Assets.ADD_ASSET:
        _assets.files.push(action.file);
        AssetsStore.emitChange();
        break;

      case CONSTANTS.Assets.UPDATE_ASSETS:
        _assets.files = action.files;
        AssetsStore.emitChange();
        break;
    }

    return true;
  })
}, Store);


module.exports = AssetsStore;
