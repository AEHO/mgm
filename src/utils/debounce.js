module.exports = (fn, ms, scope, initFn) => {
  if (!(fn && ms))
    throw new Error('debounce: fn and ms must args must be defined');

  var _timeout;
  var _consumed = false;

  return () => {
    const args = arguments;

    if (!_consumed)
      (_consumed = true, initFn.apply(scope));

    clearTimeout(_timeout);
    _timeout = setTimeout(() => {
      fn.apply(scope, args);
      _consumed = false;
    }, ms);
  };
};

