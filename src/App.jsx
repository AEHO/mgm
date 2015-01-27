/**
 * BaseLayout
 */

require('./App.sass');
require('./Page.sass');

const React = require('react');
const AssetsBar = require('./components/AssetsBar.jsx');
const Navigation = require('./components/Navigation.jsx');

const cx = require('./utils/cx');
const {AppActions} = require('./actions');
const {storesGlueMixin} = require('./mixins');
const {AppStore} = require('./stores');
const {RouteHandler} = require('react-router');

const App = React.createClass({
  mixins: [storesGlueMixin(AppStore)],

  getStateFromStores: AppStore.getStoreState,

  handleDragOver (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.showSidebar && !this.state.movingInternalAsset)
      AppActions.showSidebar();
  },

  render () {
    const appClass = cx({
      'App': true,
      'show-sidebar': this.state.showSidebar
    });

    return (
      <div className={appClass} onDragOver={this.handleDragOver}>
        <Navigation />

        <AssetsBar />
        <RouteHandler />
      </div>
    );
  },
});

module.exports = App;
