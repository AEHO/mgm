/**
 * Common methods for all Stores to inherit
 * from.
 */

const EventEmitter = require('events').EventEmitter;
const CONSTANTS = require('../constants/');
const assign = require('object-assign');


module.exports = assign({
  emitChange () {
    this.emit(CONSTANTS.General.CHANGE_EVENT);
  },

  addChangeListener (cb) {
    this.on(CONSTANTS.General.CHANGE_EVENT, cb);
  },

  removeChangeListener (cb) {
    this.removeListener(CONSTANTS.General.CHANGE_EVENT, cb);
  }
}, EventEmitter.prototype);
