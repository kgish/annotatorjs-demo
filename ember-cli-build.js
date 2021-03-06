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

    // Bootstrap: https://ember-cli.com/user-guide/#stylesheets
    app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');
    app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');

    // Moment
    app.import('bower_components/moment/min/moment.min.js');

    // Annotator: http://www.thegreatcodeadventure.com/using-annotator-js-with-ember
    app.import('bower_components/annotator/pkg/annotator-full.min.js');
    app.import('bower_components/annotator/pkg/annotator.css');

    app.import('vendor/js/annotator-discourse.js');
    app.import('vendor/css/annotator-discourse.css');

    app.import('vendor/js/diff_match_patch.js');

    return app.toTree();
};
