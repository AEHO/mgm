var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {
  closeModal () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.CLOSE_MODAL
    });
  },

  openModal () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.OPEN_MODAL
    });
  },

  enterMobilePlayMode () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.MOBILE_PLAY_MODE
    });
  }

};

module.exports = AppActions;
