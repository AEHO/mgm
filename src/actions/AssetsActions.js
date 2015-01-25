const CONSTANTS = require('../constants');
const AppDispatcher = require('../dispatcher/AppDispatcher');

const AssetsActions = {
  updateAssets (files) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Assets.UPDATE_ASSETS,
      files: files
    });
  }
};

module.exports = AssetsActions;
