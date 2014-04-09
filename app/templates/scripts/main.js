(function() {
  'use strict';

  var routes = require('./config/routes');

  window.App = new Frame.App({
    templates: JST,
    routes: routes
  });
}());
