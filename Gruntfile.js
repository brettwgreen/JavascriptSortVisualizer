module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: [
          'src/*.js',
          'Gruntfile.js'
        ],
        tasks: ['jshint']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'src/*.js']
    },
    connect: {
      server: {
        options: {
          port: 8000,
          keepalive: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');  
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  // Register the default tasks.
  grunt.registerTask('default', ['connect']);

};