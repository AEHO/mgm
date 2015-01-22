var assert = require('assert');
var updateWithKey = require('../src/utils/updateWithKey');

describe('updateWithKey', function() {
  it('be defined', function() {
    assert(updateWithKey);
  });

  it('add object if empty list', function() {
    var lst = [];
    var obj = {a: '3', b: '3'};

    var res = updateWithKey(lst, obj, 'a');
    var expected = [{a: '3', b: '3'}];

    assert.deepEqual(res, expected);
  });

  it('add object if no matches in the list', function() {
    var lst = [{a: '1', b: '1'}, {a: '2', b: '2'}];
    var obj = {a: '3', b: '3'};

    var res = updateWithKey(lst, obj, 'a');
    var expected = [{a: '1', b: '1'}, {a: '2', b: '2'}, {a: '3', b: '3'}];

    assert.deepEqual(res, expected);
  });

  it('update the object if key matches', function() {
    var lst = [{a: '1', b: '1'}, {a: '2', b: '2'}];
    var obj = {a: '2', b: 'hue'};

    var res = updateWithKey(lst, obj, 'a');
    var expected = [{a: '1', b: '1'}, {a: '2', b: 'hue'}];

    assert.deepEqual(res, expected);
  });
});
