/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Bootstrap with Sass
    sassOptions: {
      includePaths: [
        'bower_components/bootstrap-sass/assets/stylesheets'
      ]
    },

  });

  // Bootstrap
  app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');

  return app.toTree();
};
