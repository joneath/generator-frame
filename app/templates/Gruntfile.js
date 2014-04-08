// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var util = require('util');
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var yeomanConfig = {
      app: 'app',
      dist: 'dist'
  };

  // Takes grunt-browserify aliasMappings config and converts it into an alias array
  function aliasMappingsToAliasArray(aliasMappings) {
    var aliasArray = [];
    var aliases = util.isArray(aliasMappings) ? aliasMappings : [aliasMappings];
    aliases.forEach(function (alias) {
      grunt.file.expandMapping(alias.src, alias.dest, {cwd: alias.cwd}).forEach(function(file) {
        var expose = file.dest.substr(0, file.dest.lastIndexOf('.'));
        aliasArray.push('./' + file.src[0] + ':' + expose);
      });
    });
    return aliasArray;
  }

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      handlebars: {
        files: '<%%= yeoman.app %>/templates/**/*.hbs',
        tasks: ['handlebars']
      },
      compass: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },
      browserify: {
        files: ['<%%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['browserify']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '.tmp/scripts/*.js',
          '<%%= yeoman.app %>/*.html',
          '{.tmp,<%%= yeoman.app %>}/styles/{,*/}*.css',
          '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'test'),
              mountFolder(connect, '.tmp')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
        options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        },
        all: [
            'Gruntfile.js',
            '<%%= yeoman.app %>/scripts/{,*/}*.js',
            '!<%%= yeoman.app %>/scripts/vendor/*',
            'test/spec/{,*/}*.js'
        ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%%= connect.options.port %>/index.html']
        }
      }
    },
    compass: {
      options: {
        sassDir: '<%%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%%= yeoman.app %>/images',
        javascriptsDir: '<%%= yeoman.app %>/scripts',
        fontsDir: '<%%= yeoman.app %>/styles/fonts',
        importPath: '<%%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          processName: function(filename) {
            return filename.replace('app/templates/', '').replace('.hbs', '');
          },
          partialRegex: /.*/,
          partialsPathRegex: /\/partials\//
        },
        files: {
          '.tmp/scripts/templates.js': '<%%= yeoman.app %>/templates/**/*.hbs'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          '.tmp/scripts/main.js': ['<%%= yeoman.app %>/scripts/main.js']
        }
      },
      options: {
        alias: aliasMappingsToAliasArray(
          [{
            cwd: 'app/scripts/controllers',
            src: ['**/*.js'],
            dest: 'controllers'
          },
          {
            cwd: 'app/scripts/views',
            src: ['**/*.js'],
            dest: 'views'
          }]
        )
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
        dist: {}
    },*/
    // not enabled since usemin task does concat and uglify
    // check index.html to edit your build targets
    // enable this task if you prefer defining your build targets here
    /*uglify: {
        dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '.tmp/index.html',
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%%= yeoman.dist %>']
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%%= yeoman.app %>',
            dest: '<%%= yeoman.dist %>',
            src: [
              '*.{ico,txt}',
              '.htaccess',
              'images/{,*/}*.{webp,gif}',
              'styles/fonts/*'
            ]
          }
        ]
      }
    },
    concurrent: {
      server: [
        'handlebars',
        'browserify',
        'compass'
      ],
      test: [
        'handlebars',
        'browserify',
        'compass'
      ],
      dist: [
        'handlebars',
        'browserify',
        'compass:dist'
      ]
    }
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'cssmin',
    'uglify',
    'copy',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
