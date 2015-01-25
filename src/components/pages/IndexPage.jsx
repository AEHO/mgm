/**
 * IndexPage: the home page of the article
 */

require('./IndexPage.sass');

const React = require('react');
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

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      </article>
		);
	}
});

module.exports = IndexPage;
