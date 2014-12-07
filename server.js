var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
// var io = require('socket.io')(server);
var fs = require('fs');
var logger = require('morgan');

server.listen(8080, '0.0.0.0', function () {
  console.log('hadsiuhdsa');
});

app.use(logger('dev'));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({dest: './assets'}));

function _upload(file, cb) {
  var fileRootName = file.name.split('.').shift();
  var fileExtension = 'webm';
  var filePathBase = './assets/';
  var fileRootNameWithBase = filePathBase + fileRootName;
  var filePath = fileRootNameWithBase + '.' + fileExtension;
  var fileID = 2;
  var fileBuffer;

  while (fs.existsSync(filePath)) {
    filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension;
    fileID += 1;
  }

  file.contents = file.contents.split(',').pop();
  fileBuffer = new Buffer(file.contents, "base64");
  fs.writeFileSync(filePath, fileBuffer);

  cb(null, filePath);
}

app.post('/upload', function (req, res) {
  _upload(req.body, function (err, path) {
    if (err)
      return console.error(err);

    res.send(path);
  });
});

app.post('/upload/mobile', function (req, res) {
  res.send('./assets/' + req.files.contents.name);
});

// io.on('connection', function (socket) {
//   socket.emit('news', {hello: 'world'});
//   socket.on('evt', function (data) {
//     console.log(data);
//   });
// });
