const CONSTANTS = require('../constants');
const AppDispatcher = require('../dispatcher/AppDispatcher');

const AssetsActions = {
  updateAssets (files) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Assets.UPDATE_ASSETS,
      files: files
    });
  },

  addAsset (file) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Assets.ADD_ASSET,
      file: file
    });
  }
};

module.exports = AssetsActions;
