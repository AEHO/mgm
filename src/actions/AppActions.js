const CONSTANTS = require('../constants');
const AppDispatcher = require('../dispatcher/AppDispatcher');

const AppActions = {
  showSidebar () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.SHOW_SIDEBAR,
    });
  },

  hideSidebar () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.HIDE_SIDEBAR,
    });
  },

  movingInternalAsset () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.MOVING_INTERNAL_ASSET,
    });
  },

  notMovingInternalAsset () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.NOT_MOVING_INTERNAL_ASSET,
    });
  },

  consumeFirstTimeNav () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.CONSUME_FIRST_TIME_NAV,
    });
  },
};

module.exports = AppActions;
