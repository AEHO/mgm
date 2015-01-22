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
 * Encapsulates a queue that will process video
 * files and generate thumbs (one file per
 * time).
 *
 * VQ inherits from EventEmitter so that
 * processed thumbs are informed based on an
 * event.
 *
 * @param {HTMLElement} video video element
 * @param {HTMLElement} canvas canvas element
 */
function VQ (video, canvas) {
  if (!(video && canvas))
    throw new Error('VQ must be initialized with video and canvas');

  this.video = video;
  this.canvas = canvas;
  this._status = '';
  this._queue = [];
  this._pluck = plucker('name');
}

inherits(VQ, EventEmitter);

assign(VQ.prototype, {
  _ON_VIDEO_PROCESSED: '_ON_VIDEO_PROCESSED',
  _STATUS_FREE: '_STATUS_FREE',
  _STATUS_BUSY: '_STATUS_BUSY',

  add (file) {
    this._queue.push(file);
    this._process();
  },

  _emitChange (file) {
    this.emit(this._ON_VIDEO_PROCESSED, file);
  },

  addChangeListener (cb) {
    this.on(this._ON_VIDEO_PROCESSED, cb);
  },

  _process () {
    if (this._status === this._STATUS_BUSY)
      return;

    this._status = this._STATUS_BUSY;

    var file = this._queue.shift();

    this.video.src = window.URL.createObjectURL(file);
    this.video.onloadeddata = () => {
      this.video.onseeked = () => {
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;

        this.canvas
          .getContext('2d')
          .drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

        img = this.canvas.toDataURL();

        file.thumb = img;
        this._emitChange(file);

        this._status = this._STATUS_FREE;

        if (this._queue.length)
          this._process();
      };

      this.video.currentTime = this.video.duration/2|0;
    };
  }
});

module.exports = VQ;
