module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-closure-tools');

  var externsPath = 'build/externs/';
  // don't put the extension here
  var debugFile = 'source/ss/helpers/debug';

  // Project configuration.
  grunt.initConfig({
    closureDepsWriter: {
      ssnode: {
        closureLibraryPath: 'superstartup/source/closure-library',
        output_file: 'deps.js',
        options: {
          root: ['views', 'models', 'conf']
          //root_with_prefix: ['"./ ../../../ss"']
        }
      }
    }

  });

  // Default task.
  grunt.registerTask('default', 'closureDepsWriter:ssnode');

};
