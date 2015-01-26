const assign = require('object-assign');
var _callbacks = [];
var _promises = [];

var Dispatcher = function () {};

Dispatcher.prototype = assign({
  register (callback) {
    _callbacks.push(callback);

    return _callbacks.length - 1;
  },

  dispatch (payload) {
    var resolves = [];
    var rejects = [];

    _promises = _callbacks.map((_, i) =>
      new Promise((resolve, reject) => {
        resolves[i] = resolve;
        rejects[i] = reject;
      })
    );

    _callbacks.forEach((callback, i) => {
      Promise.resolve(callback(payload)).then(() => {
        resolves[i](payload);
      }, () => {
        rejects[i](new Error(''));
      });
    });

    _promises = [];
  }
}, Dispatcher.prototype);

module.exports = Dispatcher;
