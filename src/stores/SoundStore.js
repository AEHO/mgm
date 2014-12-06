var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var Sound = require('../utils/Sound');
var CONSTANTS = require('../constants');
var assign = require('object-assign');

var _sound = Sound().init();

var SoundStore = assign({
  getSoundState: () => _sound,

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      // case CONSTANTS.App.TOGGLE_MAXIMIZATION:
      //   SoundStore.emitChange();
      //   break;
    }

    return true;
  })
}, Store);


module.exports = SoundStore;
