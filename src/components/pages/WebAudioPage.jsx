/**
 * IndexPage: the home page of the article
 */

// require('./WebAudioPage.sass');

const React = require('react');
const IndexPage = React.createClass({
  render () {
    var klass = this.state.showSidebar ?
      'Page show-sidebar' :
      'Page';

    return (
      <article className={klass}>
        hue!
      </article>
    );
  }
});

module.exports = IndexPage;
