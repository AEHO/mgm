#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var React = require('react');
var async = require('async');
var rimraf = require('rimraf');
var routes = require('./src/routes');
var RRouter = require('react-router');

var P_ARTICLES = path.resolve(__dirname, './generated-article');
var URLS = [
  '/',
  '/dnd'
];


function clean (cb) {
  rimraf(P_ARTICLES, cb);
}

function createDir (cb) {
  fs.mkdir(P_ARTICLES, cb);
}

function build (cb) {
  URLS.forEach(function (url) {
    RRouter.run(routes, url, function (Handler) {
      var content = React.renderToString(React.createElement(Handler, null));

      fs.writeFile(P_ARTICLES, content, function (err) {
        if (err) throw err;
      });
    });
  });

  cb(null);
}

//////////
// MAIN //
//////////

async.series([
  clean,
  createDir
  build
]);
