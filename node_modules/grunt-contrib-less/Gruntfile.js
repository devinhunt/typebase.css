/*
 * grunt-contrib-less
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    less: {
      compile: {
        options: {
          paths: ['test/fixtures/include']
        },
        files: {
          'tmp/less.css': ['test/fixtures/style.less'],
          'tmp/concat.css': ['test/fixtures/style.less', 'test/fixtures/style2.less', 'test/fixtures/style3.less']
        }
      },
      compress: {
        options: {
          paths: ['test/fixtures/include'],
          compress: true
        },
        files: {
          'tmp/compress.css': ['test/fixtures/style.less']
        }
      },
      nopaths: {
        files: {
          'tmp/nopaths.css': ['test/fixtures/nopaths.less']
        }
      },
      cleancss: {
        options: {
          paths: ['test/fixtures/include'],
          cleancss: true
        },
        files: {
          'tmp/cleancss.css': ['test/fixtures/style.less']
        }
      },
      ieCompatTrue: {
        options: {
          paths: ['test/fixtures/include'],
          ieCompat: true
        },
        files: {
          'tmp/ieCompatTrue.css': ['test/fixtures/ieCompat.less']
        }
      },
      ieCompatFalse: {
        options: {
          paths: ['test/fixtures/include'],
          ieCompat: false
        },
        files: {
          'tmp/ieCompatFalse.css': ['test/fixtures/ieCompat.less']
        }
      },
      nofiles: {
      },
      nomatchedfiles: {
        files: { "tmp/nomatchedfiles.css" : 'test/nonexistent/*.less' }
      },
      compressReport: {
        options: {
          paths: ['test/fixtures/include'],
          compress: true,
          report: 'min'
        },
        files: {
          'tmp/compressReport.css': ['test/fixtures/style.less', 'test/fixtures/style2.less']
        }
      },
      cleancssReport: {
        options: {
          paths: ['test/fixtures/include'],
          cleancss: true,
          report: 'gzip'
        },
        files: {
          'tmp/cleancssReport.css': ['test/fixtures/style.less', 'test/fixtures/style2.less', 'test/fixtures/style3.less']
        }
      },
      variablesAsLess: {
        src: 'test/fixtures/variablesAsLess.less',
        dest: 'tmp/variablesAsLess.css',
      },
      sourceMap: {
        options: {
          sourceMap: true,
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMap.css',
      },
      sourceMapFilename: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'tmp/sourceMapFilename.css.map'
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMapFilename.css',
      },
      sourceMapURL: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'tmp/sourceMap.css.map',
          sourceMapURL: 'custom/url/for/sourceMap.css.map'
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMapWithCustomURL.css',
      },
      sourceMapBasepath: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'tmp/sourceMapBasepath.css.map',
          sourceMapBasepath: 'test/fixtures/'
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMapBasepath.css',
      },
      sourceMapRootpath: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'tmp/sourceMapRootpath.css.map',
          sourceMapRootpath: 'http://example.org/'
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMapRootpath.css',
      },
      sourceMapLessInline: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'tmp/sourceMapLessInline.css.map',
          outputSourceFiles: true,
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMapLessInline.css',
      },
      testCustomFunctions: {
        options: {
          customFunctions: {
            'get-color': function(less, color) {
              return 'red';
            },
            'multiple-args': function(less, arg1, arg2) {
              return (((arg1.value * 1) + (arg2.value))) + arg1.unit.numerator[0];
            },
            'string-result': function(less, arg1) {
                return "\"Hello\"";
            }
          }
        },
        files: {
          'tmp/customFunctions.css': ['test/fixtures/customFunctions.less']
        }
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'less', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
