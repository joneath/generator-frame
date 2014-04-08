'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var FrameGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  app: function () {
    this.mkdir('app/templates');
    this.mkdir('app/styles');
    this.mkdir('app/images');
    this.mkdir('app/scripts');
    this.mkdir('app/scripts/models');
    this.mkdir('app/scripts/controllers');
    this.mkdir('app/scripts/routes');
    this.mkdir('app/scripts/views');
    this.mkdir('app/scripts/config');

    this.copy('index.html', 'app/index.html');

    // Copy styles
    this.copy('styles/normalize.scss', 'app/styles/normalize.scss');
    this.copy('styles/main.scss', 'app/styles/main.scss');

    // Copy scripts
    this.copy('scripts/main.js', 'app/scripts/main.js');
  },

  projectfiles: function () {
    this.copy('_package.json', 'package.json');
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = FrameGenerator;
