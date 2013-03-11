/*jshint camelcase:false */
/**
 * [exports description]
 * @param  {[type]} grunt [description]
 * @return {[type]}       [description]
 */
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-closure-tools');

  var externsPath = 'build/externs/';
  // don't put the extension here
  var debugFile = 'source/ss/helpers/debug';

  // Project configuration.
  grunt.initConfig({
    closureDepsWriter: {
      options: {
        closureLibraryPath: 'closure-library/'

      },
      ssnode: {
        options: {
          root_with_prefix: ['"lib ../../../../../../lib"']
        },
        dest: 'lib/deps.js'
      },
      sshtml: {
        dest: 'assets/js/deps-showcase.js',
        options: {
          root_with_prefix: ['"assets/js ../../../../js"']
        }
      }
    }

  });

  // Default task.
  grunt.registerTask('deps', 'closureDepsWriter');

};
