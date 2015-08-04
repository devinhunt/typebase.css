'use strict';

module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pck: grunt.file.readJSON('package.json'),

    clean: {
      all: ['typebase.css']
    },

    watch: {
      less: {
        files: ['src/{,*/}*.less'],
        tasks: ['less:dev']
      }
    },

    less: {
      dev: {
        files: {
          "typebase.css": "src/typebase.less"
        }
      }
    },

    sass: {
      dev: {
        files: {
          "typebase-sass.css": "src/typebase.sass"
        }
      }
    },

    stylus: {
      dev: {
        files: {
          "typebase-stylus.css":"src/typebase.stylus"
        }
      }
    }
  });

  grunt.registerTask('dev', [
    'watch'
  ]);

  grunt.registerTask('default', [
    'clean',
    'less',
  ]);

};
