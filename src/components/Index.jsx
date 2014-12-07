var React = require('react');
var VideoTabs = require('./index/VideoTabs.jsx'); 

require('./Index.scss');

var Index = React.createClass({
	render () {
		return (
			<main>
				<h1 className="main-title">LOBN</h1>        
        <h2 className="subtitle">Adicione vídeos, clique em gravar e comece a mixar!</h2>
        <VideoTabs videos={
          [{src: "./assets/mov_bbb.mp4"},{src: "./assets/mov_bbb.mp4"},{src: "./assets/dizzy.webm"}]
        }/>
			</main>
		);
	}
});

module.exports = Index;

// <AudioRecorder />
// <SoundLoader />
// <VideoRecorder />
