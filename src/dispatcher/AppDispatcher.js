var GeneralConstants = require('../constants/GeneralConstants');
var Dispatcher = require('./Dispatcher');
var assign = require('object-assign');

var AppDispatcher = assign({
  handleViewAction (action) {
    this.dispatch({
      source: GeneralConstants.VIEW_ACTION,
      action: action
    });
  },
}, Dispatcher.prototype);

module.exports = AppDispatcher;
