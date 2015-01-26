module.exports = (fn, ms, scope) => {
  if (!(fn && ms))
    throw new Error('both args must be passed');

  var _last = new Date((new Date()).getTime() - ms);

  return () => {
    if ((_last.getTime() + ms) <= (new Date()).getTime())
      return (_last = new Date(), fn.apply(scope, arguments));
  }
};
