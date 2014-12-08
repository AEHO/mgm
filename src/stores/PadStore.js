var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var CONSTANTS = require('../constants');
var assign = require('object-assign');

var _padState = {
  videos: [
    {src: "./assets/mov_bbb.mp4", currentTime: 0, playing: false, clicks: []},
    {src: "./assets/cool.webm", currentTime: 0, playing: false, clicks: []}
  ],
  recording: false,
  playing: false,
  afId: null,
  peer: null
};

var hostSyncVideos = function() {
  _padState.peer.on('open', function() {
    var conn = _padState.peer.connect('mobile');
    console.log("REMOTE connecting to LOCAL", conn)

    conn.on('open', function(){
      console.log("connect to REMOTE opened", conn);
      conn.send(JSON.stringify( _padState.videos));
    });
  });
}

if(window.location.hash === '#mobile'){
  _padState.peer = new Peer('mobile', {key: 'annbtz013tm7k3xr'});
  _padState.peer.on('connection', function(conn) {
    console.log("LOCAL connection open", conn)
    conn.on('data', function(data){
      videos = JSON.parse(data);
      _padState.videos = videos;
        PadStore.emitChange();
      console.log("LOCAL got message", data);
    });
  });
}else{
  _padState.peer = new Peer('host', {key: 'annbtz013tm7k3xr', debug:true});
  hostSyncVideos();
}

var PadStore = assign({
  getPadState: () => _padState,

  restartVideo (i) {
    _padState.videos[i].playing = false;
    PadStore.emitChange();
    setTimeout(() => {
      _padState.videos[i].playing = true;
      PadStore.emitChange();
    }, 0);
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.Pad.ADD_VIDEO:
        _padState.videos.push({
          src: action.file, currentTime: 0, playing: false, clicks: []
        });

        hostSyncVideos();
        PadStore.emitChange();
	      break;

      case CONSTANTS.Pad.SORT_VIDEOS:
        _padState.videos = action.videos;
        break;

      case CONSTANTS.Pad.REMOVE_VIDEO:
        var obj = _padState.videos.filter((v) => v.src !== action.src);
        _padState.videos = obj;

        hostSyncVideos();
        PadStore.emitChange();
	      break;

      case CONSTANTS.Pad.ADD_VIDEO_CLICK:
        if(_padState.recording){
          _padState.videos[action.id].clicks.push(
            action.moment - _padState.recording);
        }
        break;

      case CONSTANTS.Pad.CLEAN_RECORDING:
        for (var i = 0, len = _padState.videos.length; i < len; i++) {
          _padState.videos[i].clicks = [];
        }

        PadStore.emitChange();
        break;

      case CONSTANTS.Pad.START_RECORDING:
        _padState.recording = Date.now();
        PadStore.emitChange();
        break;

      case CONSTANTS.Pad.END_RECORDING:
        _padState.recording = false;
        PadStore.emitChange();
        break;

      case CONSTANTS.Pad.PLAY_VIDEO:
        _padState.videos[action.id].playing = true;
        PadStore.emitChange();
        break;

      case CONSTANTS.Pad.STOP_VIDEO:
        _padState.videos[action.id].playing = false;
        PadStore.emitChange();
        break;

      case CONSTANTS.Pad.PLAY_RECORD:
        var start = null;
        var videoClicks = _padState.videos.map((v, i) => {
          return {clicks: v.clicks, actual: 0};
        });

        var step = function(timestamp){
          if(!start) start = timestamp;
          var progress = timestamp - start;
          var click;
          var ended = 0;
          for (var i = 0, len = videoClicks.length; i < len; i++) {
            click = videoClicks[i];
            if(click.actual >= click.clicks.length - 1){
              ended += 1;
            }
            if(click.actual < click.clicks.length &&
               click.clicks[click.actual] <= progress) {
              PadStore.restartVideo(i);
              click.actual += 1;
            }
          }
          if(videoClicks.length > ended){
            _padState.afId = window.requestAnimationFrame(step);
          }else{
            _padState.playing = false;
            PadStore.emitChange();
          }
        };
        _padState.afId = window.requestAnimationFrame(step);
        _padState.playing = true;
        PadStore.emitChange();
        break;

      case CONSTANTS.Pad.STOP_RECORD:
        window.cancelAnimationFrame(_padState.afId);
        _padState.playing = false;
        PadStore.emitChange();
        break;
    }

    return true;
  })
}, Store);


module.exports = PadStore;
