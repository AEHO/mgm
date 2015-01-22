'use strict';

var fs = require('fs');
var ReactTools = require('react-tools');
var fn = module.exports = function () {
  require.extensions['.js'] = function (module, filename) {
    module._compile(
      ReactTools.transform(
        fs.readFileSync(filename, 'utf8'),
        {harmony: true}),
      filename)
  };
};

fn();
