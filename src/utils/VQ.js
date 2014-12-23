var assign = require('object-assign');
var {inherits} = require('util');
var {EventEmitter} = require('events');

// TODO: emit 'videoprocessed' event when
// finishing a video processing.

// TODO: let others register to VQ events

/**
 * Constructs a function that, given an
 * object, returns the field of an object in a
 * given key.
 * @param {string} key
 */
var plucker = (key) => (obj) => (obj && obj[key]);

/**
 * given a Value function, an array B of
 * elements and an A, checks wheter A is in B;
 */
var isIn = (valueFun, a, b) => {
  var targetValue = valueFun(a);

  return b.some((elem) => {
    var currentValue = valueFun(elem);

    return currentValue === targetValue;
  });
};

/**
 * VideoQueue (VQ) constructor function.
 *
 * Encapsulates a queue that will process a
 * video file and then generate a thumb (one
 * file per time)
 * @param {DOMNode} video video element
 * @param {DOMNode} canvas canvas element
 */
function VQ (video, canvas) {
  if (!(video && canvas))
    throw new Error('VQ must be initialized with video and canvas');

  this.video = video;
  this.canvas = canvas;
  this._queue = [];
  this._pluck = plucker('name');
}

inherits(VQ, EventEmitter);

assign(VQ.prototype, {
  _ON_VIDEO_PROCESSED: '_ON_VIDEO_PROCESSED',

  add (file) {
    // if (!isIn(this._pluck, file, this._queue))
    //   return;

    this._queue.push(file);
    this._process();
  },

  _emitChange (data) {
    this.emit(this._ON_VIDEO_PROCESSED, data);
  },

  addChangeListener (cb) {
    this.on(this._ON_VIDEO_PROCESSED, cb);
  },

  _process () {
    this.video.src = window.URL.createObjectURL(this._queue.shift());

    this.video.onloadeddata = () => {
      this.video.onseeked = () => {
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;

        this.canvas
          .getContext('2d')
          .drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

        img = this.canvas.toDataURL();
        this._emitChange(img);
      };

      this.video.currentTime = this.video.duration/2|0;
    };
  }
});

module.exports = VQ;
