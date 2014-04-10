(function() {
  'use strict';

  require('./utils/helpers');

  window.App = new Frame.App({
    templates: JST,
    routes: require('./config/routes')
  });
}());
