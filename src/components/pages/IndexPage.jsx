/**
 * IndexPage: the home page of the article
 */

require('./IndexPage.sass');

const React = require('react');
const {Link} = require('react-router');
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
          <h1>Index Page</h1>
          <h2>A quick view of the demos</h2>
        </header>

        <p>
          There are mainly three demos to be shown.

          The <strong>first</strong> aims to show <strong>how routing works</strong>
          an what we are able to do with it.
        </p>

        <ul>
          <li><Link to="webaudio">WebAudio demo</Link></li>
        </ul>

      </article>
		);
	}
});

module.exports = IndexPage;
