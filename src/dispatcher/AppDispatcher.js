const GeneralConstants = require('../constants/GeneralConstants');
const Dispatcher = require('./Dispatcher');
const assign = require('object-assign');

const AppDispatcher = assign({
  handleViewAction (action) {
    this.dispatch({
      source: GeneralConstants.VIEW_ACTION,
      action: action
    });
  },
}, Dispatcher.prototype);

module.exports = AppDispatcher;
