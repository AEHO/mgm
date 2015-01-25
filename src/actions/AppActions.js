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
  }
};

module.exports = AppActions;
