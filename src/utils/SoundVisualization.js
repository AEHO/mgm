var SoundVisualization = {
  _getAverageVolume (array) {
    var values = 0;
    var N = array.length;

    for (var i = 0; i < N; i++)
      values += array[i];

    return values/N;
  },

  createFreqVis (_sound, canvas) {
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0,0,0,300);
    var jsNode = _sound.context.createScriptProcessor(2048, 1, 1);
    var analyser = _sound.context.createAnalyser();

    gradient.addColorStop(1,'#000000');
    gradient.addColorStop(0.75,'#ff0000');
    gradient.addColorStop(0.25,'#ffff00');
    gradient.addColorStop(0,'#ffffff');

    jsNode.connect(_sound.context.destination);
    jsNode.onaudioprocess = () => {
      var array =  new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);

      ctx.clearRect(0, 0, 1000, 325);
      ctx.fillStyle=gradient;

      for (var i = 0; i < array.length; i++)
        ctx.fillRect(i*5,325-array[i],3,325);
    };

    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 512;
    analyser.connect(jsNode);

    return analyser;
  },

  createLevelVis (_sound, canvas) {
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0,0,0,300);
    var jsNode = _sound.context.createScriptProcessor(2048, 1, 1);
    var analyser = _sound.context.createAnalyser();

    gradient.addColorStop(1,'#000000');
    gradient.addColorStop(0.75,'#ff0000');
    gradient.addColorStop(0.25,'#ffff00');
    gradient.addColorStop(0,'#ffffff');

    analyser.smoothingTimeConstant = .3;
    analyser.fftSize = 1024;

    jsNode.onaudioprocess = () => {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var average = this._getAverageVolume(array);

      ctx.clearRect(0,0,60,130);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 130-average, 25, 130);
    };

    jsNode.connect(_sound.context.destination);

    analyser.connect(jsNode);

    return analyser;
  },
};

module.exports = SoundVisualization;
