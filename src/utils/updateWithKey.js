/**
 * Updates a list of objects given a key in the
 * first layer of them.
 * @param  {[type]} lst [description]
 * @param  {[type]} obj [description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
module.exports = (lst, obj, key) => {
  var index = -1;
  var arr = lst.slice();

  arr.some((curr, i) => curr[key] === obj[key] ? (index = i, true) : false);

  return !~index ?
    (arr.push(obj), arr) :
    (arr[index] = obj, arr);
};
