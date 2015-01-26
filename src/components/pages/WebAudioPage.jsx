/**
 * IndexPage: the home page of the article
 */

// require('./WebAudioPage.sass');

const React = require('react');
const AudioGraph = require('../AudioGraph.jsx');
const {AppStore} = require('../../stores');
const {storesGlueMixin} = require('../../mixins');

const IndexPage = React.createClass({
  mixins: [storesGlueMixin(AppStore)],

  getStateFromStores: AppStore.getStoreState,

  render () {
    var klass = this.state.showSidebar ?
      'Page show-sidebar' :
      'Page';

    return (
      <article className={klass}>
        <header>
          <h1>#WebAudio</h1>
          <h2>Working with the audio graph</h2>
        </header>

        <AudioGraph />
      </article>
    );
  }
});

module.exports = IndexPage;
