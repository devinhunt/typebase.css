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
      },
      sass: {
        files: ['src/{,*/}*.scss'],
        tasks: ['sass:dev']
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
          "typebase-sass.css": "src/typebase.sass",
          "typebase-scss.css": "src/typebase.scss"
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
    'sass'
  ]);

};
